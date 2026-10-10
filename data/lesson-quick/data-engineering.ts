import type { LessonQuick } from '@/lib/lesson-quick'

const E = '/learn/data-engineering'

// SQL examples run on FreshCart and Python examples with python3 (scripts/quick-results.ts);
// shell, Airflow, Terraform and dbt snippets are shown as code.
export const DE_QUICK: Record<string, LessonQuick> = {
  [`${E}/what-is-data`]: {
    answer: 'Data is a recorded fact about the world, such as a purchase, a click or a temperature reading, captured by a system. Computers store all of it as binary: bits grouped into bytes, interpreted by a data type.',
    points: [
      'If it was not recorded, it is not data.',
      'One byte is 8 bits and holds 256 values.',
      'The data type decides size and correctness: int32 vs int64, float vs decimal.',
    ],
    example: {
      label: 'The same text and numbers as bytes',
      lang: 'python',
      code: `text = "Hi"
print(list(text.encode("utf-8")), [format(b, "08b") for b in text.encode("utf-8")])
print("int32 max:", 2**31 - 1)
print(0.1 + 0.2 == 0.3)`,
    },
    check: {
      question: 'How many distinct values can one byte hold?',
      options: ['8', '128', '256', '1024'],
      answer: 2,
      explanation: 'A byte is 8 bits, and 2⁸ = 256 combinations.',
    },
  },

  [`${E}/what-is-data-engineering`]: {
    answer: 'Data engineering builds and runs the systems that move data from where it is created to where it is used, reliably, at scale and automatically. The lifecycle runs generation → ingestion → storage → transformation → serving, with orchestration around it.',
    points: [
      'Data engineers build pipelines and platforms; analysts and scientists use what they produce.',
      'Maintaining existing pipelines is a large part of the job.',
      'SQL and Python are the core skills.',
    ],
    example: {
      label: 'A pipeline in miniature: extract, transform, load',
      lang: 'python',
      code: `raw = ["2024-03-01,milk,3.50", "2024-03-01,bread,", "2024-03-02,milk,3.50"]   # extract

rows = []
for line in raw:                                   # transform
    date, item, price = line.split(",")
    if price:
        rows.append({"date": date, "item": item, "price": float(price)})

warehouse = {}                                     # load
for r in rows:
    warehouse[r["date"]] = round(warehouse.get(r["date"], 0) + r["price"], 2)
print(warehouse, "| dropped", len(raw) - len(rows), "bad row")`,
    },
    check: {
      question: 'Which phase comes right after ingestion in the data engineering lifecycle?',
      options: ['Serving', 'Storage', 'Generation', 'Transformation'],
      answer: 1,
      explanation: 'Generation → ingestion → storage → transformation → serving, with orchestration across all of them.',
    },
  },

  [`${E}/how-data-moves`]: {
    answer: 'Data moves through a company along one path: source systems → a landing zone with raw copies → bronze (raw, typed) → silver (cleaned) → gold (business-ready) → dashboards, models and apps. Knowing the path tells you where data was lost or changed.',
    points: [
      'Source systems run the business; pipelines must not slow them down.',
      'Never delete the landing zone: it lets you reprocess from scratch.',
      'Each layer has a contract consumers can rely on.',
    ],
    example: {
      label: 'From raw orders to a gold-layer daily revenue figure',
      lang: 'sql',
      code: `SELECT order_date,
       COUNT(*) AS delivered_orders,
       ROUND(SUM(total_amount), 2) AS revenue
FROM orders
WHERE order_status = 'Delivered'
GROUP BY order_date
ORDER BY order_date
LIMIT 5;`,
    },
    check: {
      question: 'Why keep the raw landing-zone copy after it has been cleaned?',
      options: ['Regulators require it', 'So you can reprocess everything when transformation logic changes', 'It makes queries faster', 'It is not needed'],
      answer: 1,
      explanation: 'Raw data is the only way to rebuild the downstream layers after a bug fix or a logic change.',
    },
  },

  [`${E}/de-ecosystem`]: {
    answer: 'Data engineering tools fall into a handful of categories: languages, source systems, ingestion, message brokers, object storage, table formats, warehouses, processing engines, orchestration and quality/observability. Tools change; the categories and the problems they solve do not.',
    points: [
      'Learn what each category solves; any tool in it then takes days, not months.',
      'Python and SQL appear in every stack.',
      'Pick tools to fit the company stack, not the hype.',
    ],
    example: {
      label: 'One typical stack, category by category',
      lang: 'text',
      code: `Ingestion        Fivetran / Airbyte / custom Python
Message broker   Apache Kafka
Object storage   Amazon S3
Table format     Delta Lake / Apache Iceberg
Warehouse        Snowflake / BigQuery
Processing       Spark / dbt (SQL)
Orchestration    Airflow / Dagster
Quality          dbt tests / Great Expectations`,
      static: true,
    },
    check: {
      question: 'Which category does Apache Airflow belong to?',
      options: ['Warehouse', 'Orchestration', 'Message broker', 'Table format'],
      answer: 1,
      explanation: 'Airflow schedules and coordinates pipeline tasks; it does not store or process the data itself.',
    },
  },

  [`${E}/de-vs-other-roles`]: {
    answer: 'The four data roles answer different questions. Data engineers: is data moving reliably? Analysts: what happened? Data scientists: what will happen? ML engineers: how do predictions reach users at scale? Each builds on the data engineer\'s pipelines.',
    points: [
      'Data engineers own pipelines and platforms, not dashboards or models.',
      'Analysts work mostly in SQL and BI tools.',
      'ML engineers turn models into reliable production services.',
    ],
    example: {
      label: 'The same orders data, three roles\' questions',
      lang: 'text',
      code: `Data engineer   Did last night's orders load completely and on time?
Data analyst    Which store had the most revenue in March?
Data scientist  How many orders will each store get next week?
ML engineer     How do we serve that forecast to the app in 50 ms?`,
      static: true,
    },
    check: {
      question: 'Who typically owns the pipeline that loads raw orders into the warehouse?',
      options: ['Data analyst', 'Data engineer', 'Data scientist', 'ML engineer'],
      answer: 1,
      explanation: 'Moving data reliably into the platform is the data engineer\'s core responsibility.',
    },
  },

  [`${E}/de-usa-job-market`]: {
    answer: 'US data engineering roles ask mainly for SQL, Python, one cloud (AWS, Azure or GCP), a warehouse such as Snowflake or BigQuery, and pipeline tools like Airflow and dbt. A strong, documented project can stand in for a CS degree at many companies.',
    points: [
      'One deep project beats several tutorial clones.',
      'Read job descriptions for the skills they list, not the title.',
      'Bootcamp and self-taught paths work when the portfolio is strong.',
    ],
    example: {
      label: 'Decoding a typical job description',
      lang: 'text',
      code: `"3+ years with Python and SQL"        → must-have
"Experience with Airflow or Dagster"  → orchestration
"Snowflake, dbt"                      → warehouse + transformation
"Kafka a plus"                        → nice to have
"Build reliable, tested pipelines"    → idempotency, tests, monitoring`,
      static: true,
    },
    check: {
      question: 'What helps most when applying without a CS degree?',
      options: ['Many short tutorial projects', 'One deep, well-documented project', 'A long list of tools on the résumé', 'A higher GPA'],
      answer: 1,
      explanation: 'A real project shows the judgement interviewers look for, which tutorial clones do not.',
    },
  },

  [`${E}/data-types-structured`]: {
    answer: 'Data comes in three shapes. Structured data has a fixed schema (database tables, CSVs with headers); semi-structured data describes itself and can vary (JSON, XML); unstructured data has no schema at all (images, PDFs, free text).',
    points: [
      'Structured data is easy to query but breaks pipelines when the schema changes.',
      'CSV looks structured but nothing enforces it; validate it.',
      'Semi-structured data needs flattening before analysis.',
    ],
    example: {
      label: 'Flattening semi-structured JSON into rows',
      lang: 'python',
      code: `import json

event = json.loads('{"order": 1042, "customer": {"id": 7, "city": "Austin"}, "items": [{"sku": "A1", "qty": 2}, {"sku": "B4", "qty": 1}]}')
for item in event["items"]:
    print(event["order"], event["customer"]["city"], item["sku"], item["qty"])`,
    },
    check: {
      question: 'Which is semi-structured data?',
      options: ['A PostgreSQL table', 'A JSON API response', 'A product photo', 'A scanned PDF'],
      answer: 1,
      explanation: 'JSON carries its own field names and can vary between records: semi-structured.',
    },
  },

  [`${E}/data-formats`]: {
    answer: 'CSV, JSON and Avro store data row by row, which suits writing records and exchanging data. Parquet and ORC store it column by column, which suits analytics: queries read only the columns they need and skip row groups using stored statistics.',
    points: [
      'Convert CSV to Parquet when data lands in the lake.',
      'Avro carries a schema and is common on Kafka.',
      'Columnar files compress far better.',
    ],
    example: {
      label: 'Row-oriented vs column-oriented layout of the same table',
      lang: 'python',
      code: `rows = [("1001", "Austin", 59.69), ("1002", "Denver", 27.97), ("1003", "Austin", 17.95)]

row_layout = [value for row in rows for value in row]
column_layout = {name: [row[i] for row in rows] for i, name in enumerate(["order_id", "city", "total"])}
print("row file:   ", row_layout)
print("column file:", column_layout)
print("SUM(total) reads only:", column_layout["total"])`,
    },
    check: {
      question: 'Why is Parquet faster than CSV for SELECT SUM(amount)?',
      options: ['It is always cached', 'It reads only the amount column instead of whole rows', 'It sorts the data', 'It skips NULLs'],
      answer: 1,
      explanation: 'Columnar storage keeps each column together, so the query reads one column\'s bytes and nothing else.',
    },
  },

  [`${E}/databases-internals`]: {
    answer: 'A database stores data in fixed-size pages on disk, finds rows through B-tree indexes, keeps hot pages in a memory buffer pool, records every change in a write-ahead log before applying it, and uses transactions with MVCC so readers and writers do not block each other.',
    points: [
      'An index lookup is O(log n); a full scan reads every page.',
      'LSM-tree engines (Cassandra, RocksDB) favour heavy writes.',
      'The write-ahead log is what makes recovery after a crash possible.',
    ],
    example: {
      label: 'A query plan: index search vs full scan',
      lang: 'sql',
      code: `EXPLAIN QUERY PLAN
SELECT first_name FROM customers WHERE customer_id = 7;`,
    },
    check: {
      question: 'What does the write-ahead log (WAL) guarantee?',
      options: ['Faster reads', 'Committed changes survive a crash', 'Smaller tables', 'Automatic indexing'],
      answer: 1,
      explanation: 'Changes are logged durably before data pages change, so recovery can replay committed work.',
    },
  },

  [`${E}/sql-vs-nosql`]: {
    answer: 'Choose a database by access pattern, not by "SQL vs NoSQL". Relational databases give flexible queries and strong consistency; NoSQL families each optimise one pattern: key-value (Redis) for lookups by key, document (MongoDB) for whole-entity reads, column-family (Cassandra) for massive writes, graph (Neo4j) for relationships.',
    points: [
      'Relational is the right default for structured, related data.',
      'Redis is a cache and counter store, not a primary database.',
      'Cassandra tables are designed around the queries you will run.',
    ],
    example: {
      label: 'The same order as rows and as a document',
      lang: 'json',
      code: `// relational: orders, order_items and customers tables joined at read time
// document (MongoDB): one read returns the whole order
{
  "order_id": 1002,
  "customer": { "id": 2, "name": "Liam Williams" },
  "items": [
    { "product": "Jasmine Rice", "qty": 1, "price": 8.99 },
    { "product": "Large Eggs", "qty": 1, "price": 5.99 }
  ]
}`,
      static: true,
    },
    check: {
      question: 'Which store fits rate limiting with counters per user per minute?',
      options: ['A document database', 'A key-value store like Redis', 'A graph database', 'A data warehouse'],
      answer: 1,
      explanation: 'Fast increments on a key with expiry are exactly what Redis is built for.',
    },
  },

  [`${E}/warehouse-lake-lakehouse`]: {
    answer: 'A data warehouse is a structured, columnar SQL database with schema-on-write and strong governance. A data lake is cheap object storage holding any file format with schema-on-read. A lakehouse adds an open table format (Delta, Iceberg, Hudi) to the lake for ACID transactions and warehouse-like SQL.',
    points: [
      'Warehouses are fast and governed but cost more per GB.',
      'A lake without formats, partitioning and a catalogue becomes a swamp.',
      'A lakehouse keeps one copy of data for BI and ML.',
    ],
    example: {
      label: 'A lakehouse table: Parquet files plus a transaction log',
      lang: 'text',
      code: `s3://lake/silver/orders/
  _delta_log/00000000000000000041.json   ← commits make files visible atomically
  order_date=2024-03-14/part-0001.parquet
  order_date=2024-03-15/part-0001.parquet`,
      static: true,
    },
    check: {
      question: 'What does a lakehouse add to a data lake?',
      options: ['Cheaper storage', 'ACID transactions through an open table format', 'Unstructured data support', 'A BI tool'],
      answer: 1,
      explanation: 'Delta Lake, Iceberg and Hudi add a transaction log over Parquet files, giving ACID semantics on object storage.',
    },
  },

  [`${E}/schemas-tables-keys`]: {
    answer: 'A schema groups related tables, often one per layer (bronze, silver, gold). Each table has typed columns, a primary key that identifies each row, foreign keys that link tables, and indexes that speed up lookups.',
    points: [
      'Use BIGINT for IDs; INTEGER overflows at about 2.1 billion.',
      'Use DECIMAL for money, never FLOAT.',
      'Store event times with a time zone (TIMESTAMPTZ).',
    ],
    example: {
      label: 'Keys that tie two tables together',
      lang: 'sql',
      code: `SELECT o.order_id, o.customer_id, c.first_name
FROM orders AS o
JOIN customers AS c ON c.customer_id = o.customer_id   -- foreign key → primary key
LIMIT 4;`,
    },
    check: {
      question: 'Why is FLOAT wrong for money?',
      options: ['It uses too much space', 'It cannot represent most decimal fractions exactly', 'It cannot be indexed', 'It is slow to sum'],
      answer: 1,
      explanation: 'Binary floating point rounds values like 0.1, and the errors add up in totals. DECIMAL is exact.',
    },
  },

  [`${E}/acid-transactions`]: {
    answer: 'ACID is four guarantees for database transactions: Atomicity (all changes or none), Consistency (constraints always hold), Isolation (concurrent transactions do not see each other\'s partial work) and Durability (committed data survives crashes).',
    points: [
      'Atomicity and durability come from the write-ahead log.',
      'Isolation levels trade anomalies against concurrency.',
      'Business rules beyond constraints must be checked by your pipeline.',
    ],
    example: {
      label: 'A rolled-back transaction leaves no trace',
      lang: 'sql',
      code: `BEGIN;
UPDATE products SET unit_price = unit_price * 2;
ROLLBACK;

SELECT product_name, unit_price FROM products LIMIT 3;`,
    },
    check: {
      question: 'Which property stops other sessions seeing a half-finished transaction?',
      options: ['Atomicity', 'Consistency', 'Isolation', 'Durability'],
      answer: 2,
      explanation: 'Isolation controls what concurrent transactions can see of each other\'s uncommitted work.',
    },
  },

  [`${E}/python-for-de`]: {
    answer: 'Python for data engineering is about reliable plumbing: streaming large files in chunks, calling APIs with auth, pagination and rate limits, retrying only transient errors, logging in a structured way, and writing small functions you can test.',
    points: [
      'Process big files in chunks or with generators; memory should not grow with file size.',
      'Retry transient errors with backoff; fail fast on permanent ones.',
      'Read configuration and secrets from the environment.',
    ],
    example: {
      label: 'Stream a file in fixed-size chunks with a generator',
      lang: 'python',
      code: `import csv, io

def chunks(reader, size):
    batch = []
    for row in reader:
        batch.append(row)
        if len(batch) == size:
            yield batch
            batch = []
    if batch:
        yield batch

data = io.StringIO("id,amount\\n" + "\\n".join(f"{i},{i * 10}" for i in range(1, 8)))
for n, batch in enumerate(chunks(csv.DictReader(data), size=3), start=1):
    print(f"batch {n}: {len(batch)} rows, total {sum(int(r['amount']) for r in batch)}")`,
    },
    check: {
      question: 'Which error should a pipeline retry?',
      options: ['401 Unauthorized', 'A schema validation failure', 'A 503 Service Unavailable', 'A missing configuration value'],
      answer: 2,
      explanation: '503 is transient; retrying with backoff often succeeds. The others fail the same way every time.',
    },
  },

  [`${E}/sql-for-de`]: {
    answer: 'Data engineers lean on a few advanced SQL tools daily: window functions (ROW_NUMBER, RANK, LAG, running totals), CTEs to structure multi-step logic, deduplication with ROW_NUMBER, and careful NULL handling.',
    points: [
      'Deduplicate with ROW_NUMBER() OVER (PARTITION BY key ORDER BY updated_at DESC) and keep rn = 1.',
      'Give LAG and LEAD a default for the first and last rows.',
      'COALESCE turns NULLs into explicit defaults.',
    ],
    example: {
      label: 'Keep only each customer\'s latest order',
      lang: 'sql',
      code: `WITH ranked AS (
  SELECT customer_id, order_id, order_date,
         ROW_NUMBER() OVER (PARTITION BY customer_id ORDER BY order_date DESC, order_id DESC) AS rn
  FROM orders
)
SELECT customer_id, order_id, order_date
FROM ranked
WHERE rn = 1
ORDER BY customer_id
LIMIT 5;`,
    },
    check: {
      question: 'Which function guarantees exactly one row per group when deduplicating?',
      options: ['RANK', 'DENSE_RANK', 'ROW_NUMBER', 'COUNT'],
      answer: 2,
      explanation: 'ROW_NUMBER gives unique numbers even for ties, so rn = 1 keeps exactly one row.',
    },
  },

  [`${E}/linux-shell`]: {
    answer: 'Data engineers use the shell daily to inspect servers and files: check disk space (df -h, du -sh), read logs (tail, grep), count and rank values (cut | sort | uniq -c), manage permissions (chmod) and schedule jobs (cron).',
    points: [
      'A full disk causes failures that look like anything else; check it first.',
      'cut | sort | uniq -c | sort -rn ranks any column without code.',
      'Permissions: 755 scripts, 644 configs, 600 secrets.',
    ],
    example: {
      label: 'Rank the most frequent error codes in a log',
      lang: 'bash',
      code: `df -h /data                       # is the disk full?
grep ERROR pipeline.log | cut -d' ' -f4 | sort | uniq -c | sort -rn | head -5
chmod 600 ~/.secrets/warehouse.env
crontab -e                         # 0 2 * * * /opt/etl/run.sh >> /var/log/etl.log 2>&1`,
      static: true,
    },
    check: {
      question: 'Which permission fits a file that holds credentials?',
      options: ['777', '755', '644', '600'],
      answer: 3,
      explanation: '600 lets only the owner read and write; nobody else can read the secret.',
    },
  },

  [`${E}/git-for-data`]: {
    answer: 'Git tracks every change to pipeline code, SQL models and configuration. You edit in the working directory, stage with git add, record with git commit, and propose changes on a short-lived branch through a pull request that CI tests before merging.',
    points: [
      'Use one protected main branch with short feature branches (GitHub Flow).',
      'Never commit secrets, data files or generated output; use .gitignore.',
      'git revert undoes a shared commit safely; avoid rewriting shared history.',
    ],
    example: {
      label: 'A feature branch from start to pull request',
      lang: 'bash',
      code: `git switch -c fix/orders-dedup
git add models/silver/orders.sql
git commit -m "Deduplicate orders by latest updated_at"
git push -u origin fix/orders-dedup     # then open a pull request; CI runs dbt tests`,
      static: true,
    },
    check: {
      question: 'Which file should never be committed?',
      options: ['models/orders.sql', 'dbt_project.yml', '.env with database passwords', 'README.md'],
      answer: 2,
      explanation: 'Secrets in history are exposed to everyone with access, even after deletion. Keep .env in .gitignore.',
    },
  },

  [`${E}/working-with-apis`]: {
    answer: 'Ingesting from an API means sending authenticated HTTP requests, following pagination until the data is complete, respecting rate limits (429 with Retry-After), and retrying server errors with backoff while failing fast on client errors.',
    points: [
      '2xx success; 4xx your request is wrong; 5xx retry with backoff.',
      'Prefer cursor pagination: stable under writes and resumable.',
      'Store a checkpoint so a failed run resumes where it stopped.',
    ],
    example: {
      label: 'Follow a cursor until there are no more pages',
      lang: 'python',
      code: `PAGES = {None: (["p1", "p2"], "c1"), "c1": (["p3", "p4"], "c2"), "c2": (["p5"], None)}

def fetch(cursor):              # stands in for an HTTP GET with ?cursor=
    return PAGES[cursor]

cursor, collected = None, []
while True:
    items, cursor = fetch(cursor)
    collected += items
    print(f"got {len(items)}, next cursor = {cursor}")
    if cursor is None:
        break
print("total", len(collected))`,
    },
    check: {
      question: 'An API answers 429 with Retry-After: 30. What should the pipeline do?',
      options: ['Retry immediately', 'Wait 30 seconds, then retry', 'Fail the run', 'Switch API keys'],
      answer: 1,
      explanation: '429 means too many requests; the server tells you exactly how long to back off.',
    },
  },

  [`${E}/files-at-scale`]: {
    answer: 'At scale, file layout decides speed and cost: name files with source, entity, ISO date and run ID; partition directories Hive-style (date=2024-03-15/) so engines skip irrelevant data; compress with a splittable codec; and avoid thousands of tiny files.',
    points: [
      'Partition by low-cardinality columns such as date, never by customer_id.',
      'Small files slow every query; compact them.',
      'ISO dates in names sort chronologically.',
    ],
    example: {
      label: 'A partitioned layout a query engine can prune',
      lang: 'text',
      code: `s3://lake/bronze/orders/
  date=2024-03-14/orders_20240314_run-8f2c.parquet
  date=2024-03-15/orders_20240315_run-91ab.parquet

WHERE date = '2024-03-15'  →  reads one directory, skips the rest`,
      static: true,
    },
    check: {
      question: 'Why not partition a table by customer_id?',
      options: ['It is not allowed', 'Millions of customers create millions of tiny directories', 'It breaks compression', 'Queries cannot filter on it'],
      answer: 1,
      explanation: 'High-cardinality partitions explode into tiny files and directories, which makes every operation slow.',
    },
  },

  [`${E}/what-is-a-pipeline`]: {
    answer: 'A data pipeline moves data from sources to destinations through stages: extract, transform, load, with orchestration and monitoring around them. Extraction is full or incremental, and loading is full replace, append or upsert.',
    points: [
      'Incremental extraction needs a watermark column such as updated_at.',
      'Upsert is the safe default for data that changes.',
      'Every pipeline should be safe to re-run.',
    ],
    example: {
      label: 'Incremental extraction with a watermark',
      lang: 'sql',
      code: `-- last successful run saved its watermark: 2024-03-20
SELECT order_id, order_date, order_status
FROM orders
WHERE order_date > '2024-03-20'
ORDER BY order_date;`,
    },
    check: {
      question: 'What does incremental extraction require?',
      options: ['A full table scan each run', 'A reliable column that shows what changed, such as updated_at', 'A message broker', 'Parquet files'],
      answer: 1,
      explanation: 'The pipeline reads rows past the last saved watermark, so it needs a column that always advances on change.',
    },
  },

  [`${E}/batch-vs-streaming`]: {
    answer: 'Batch processing runs on a schedule over a bounded set of data and stops; streaming processes each event continuously as it arrives; micro-batch runs small batches every few seconds or minutes. Batch is simpler and cheaper, so choose streaming only when the business needs low latency.',
    points: [
      'Batch is the right default for most workloads.',
      'Streaming suits fraud detection, live tracking and alerting.',
      'Spark Structured Streaming is micro-batch under the hood.',
    ],
    example: {
      label: 'Matching latency needs to a processing model',
      lang: 'text',
      code: `Daily revenue dashboard        → batch, nightly
Inventory sync every 5 minutes → micro-batch
Card fraud check per swipe     → streaming, milliseconds`,
      static: true,
    },
    check: {
      question: 'A finance report is read once each morning. Which model fits?',
      options: ['Streaming', 'Batch', 'Micro-batch every second', 'Change data capture'],
      answer: 1,
      explanation: 'Nobody needs it sooner than the morning, so the simpler, cheaper batch run is right.',
    },
  },

  [`${E}/etl-vs-elt`]: {
    answer: 'ETL transforms data before loading it into the destination; ELT loads raw data first and transforms it inside the warehouse with SQL (often with dbt). Cheap cloud storage and compute made ELT the modern default because it keeps the raw data.',
    points: [
      'ELT keeps raw data, so a transformation bug can be fixed and rebuilt.',
      'ETL still fits when data must be cleaned or masked before it lands.',
      'The letters say where the transformation happens.',
    ],
    example: {
      label: 'ELT: raw rows are loaded, then transformed in SQL',
      lang: 'sql',
      code: `-- the T in ELT: a clean view built inside the warehouse from raw data
SELECT order_id,
       UPPER(TRIM(payment_method)) AS payment_method,
       ROUND(total_amount, 2) AS total_usd
FROM orders
WHERE order_status <> 'Cancelled'
LIMIT 4;`,
    },
    check: {
      question: 'What is the main advantage of ELT?',
      options: ['It needs no warehouse', 'Raw data is preserved, so transformations can be rerun', 'It avoids SQL', 'It is always real-time'],
      answer: 1,
      explanation: 'Because raw data lands untouched, fixing a model and rebuilding from raw is always possible.',
    },
  },

  [`${E}/ingestion-patterns`]: {
    answer: 'Three patterns cover every source: full load (copy everything each run), incremental (copy rows changed since a high-water mark) and change data capture (read the database\'s transaction log for every insert, update and delete).',
    points: [
      'Full load suits small reference tables.',
      'Incremental scales to huge tables but cannot see hard deletes.',
      'CDC captures deletes and every intermediate change.',
    ],
    example: {
      label: 'An incremental run that advances its high-water mark',
      lang: 'python',
      code: `source = [
    {"id": 1, "updated_at": "2024-03-01"},
    {"id": 2, "updated_at": "2024-03-05"},
    {"id": 3, "updated_at": "2024-03-09"},
]
watermark = "2024-03-04"                      # saved by the previous run
changed = [r for r in source if r["updated_at"] > watermark]
watermark = max(r["updated_at"] for r in changed)
print("loaded ids", [r["id"] for r in changed], "| new watermark", watermark)`,
    },
    check: {
      question: 'Which pattern can detect rows that were hard-deleted in the source?',
      options: ['Incremental by updated_at', 'Change data capture', 'Append-only', 'None of them'],
      answer: 1,
      explanation: 'A deleted row has no updated_at to find, but the delete is recorded in the transaction log that CDC reads.',
    },
  },

  [`${E}/change-data-capture`]: {
    answer: 'Change data capture reads a database\'s write-ahead log to stream every committed insert, update and delete as an event. In PostgreSQL that means logical decoding (wal_level=logical) with a replication slot; Debezium reads it and publishes events to Kafka.',
    points: [
      'A replication slot keeps WAL until the consumer confirms it; a stalled consumer fills the disk.',
      'Each event carries before and after images of the row.',
      'The outbox pattern publishes domain events reliably alongside a transaction.',
    ],
    example: {
      label: 'A Debezium change event for an update (simplified)',
      lang: 'json',
      code: `{
  "op": "u",
  "before": { "order_id": 1003, "order_status": "Processing" },
  "after":  { "order_id": 1003, "order_status": "Delivered" },
  "source": { "table": "orders", "lsn": 24023128 }
}`,
      static: true,
    },
    check: {
      question: 'What happens if a CDC consumer stops reading from a PostgreSQL replication slot?',
      options: ['Nothing', 'The database keeps WAL for it, and disk usage grows', 'The slot is deleted automatically', 'Writes stop immediately'],
      answer: 1,
      explanation: 'The slot pins WAL until it is consumed, so an abandoned slot can fill the disk.',
    },
  },

  [`${E}/batch-pipeline-from-scratch`]: {
    answer: 'A production batch pipeline is a set of single-purpose steps: load and validate config, read a checkpoint, extract in chunks, validate rows, transform, upsert into the destination, then save the checkpoint, with logging and metrics throughout.',
    points: [
      'Fail at startup when configuration is missing.',
      'Save the checkpoint only after the write succeeds.',
      'Write checkpoints atomically: write a temp file, then rename it.',
    ],
    example: {
      label: 'An atomic checkpoint: write, then rename',
      lang: 'python',
      code: `import json, os

def save_checkpoint(path, value):
    tmp = path + ".tmp"
    with open(tmp, "w") as f:
        json.dump({"watermark": value}, f)
    os.replace(tmp, path)            # atomic: readers see old or new, never half

save_checkpoint("checkpoint.json", "2024-03-15")
with open("checkpoint.json") as f:
    print(json.load(f))`,
    },
    check: {
      question: 'When should a batch pipeline save its checkpoint?',
      options: ['Before extracting', 'Right after extracting', 'After the destination write succeeds', 'Only on failure'],
      answer: 2,
      explanation: 'Saving earlier means a failed write is skipped forever on the next run: silent data loss.',
    },
  },

  [`${E}/idempotency-atomicity`]: {
    answer: 'An idempotent pipeline produces the same result whether it runs once or ten times; an atomic step either completes fully or leaves no trace. Together they make a pipeline safe to restart after any failure.',
    points: [
      'Upsert on a unique key instead of blind inserts.',
      'Use fixed extraction windows (for 2024-03-15), not "the last 24 hours".',
      'Wrap each batch in a transaction or swap tables atomically.',
    ],
    example: {
      label: 'Running the same upsert twice changes nothing the second time',
      lang: 'sql',
      code: `CREATE TABLE daily_revenue (day TEXT PRIMARY KEY, revenue REAL);

INSERT INTO daily_revenue
SELECT order_date, ROUND(SUM(total_amount), 2) FROM orders
WHERE order_status = 'Delivered' AND order_date = '2024-03-01' GROUP BY order_date
ON CONFLICT(day) DO UPDATE SET revenue = excluded.revenue;

INSERT INTO daily_revenue
SELECT order_date, ROUND(SUM(total_amount), 2) FROM orders
WHERE order_status = 'Delivered' AND order_date = '2024-03-01' GROUP BY order_date
ON CONFLICT(day) DO UPDATE SET revenue = excluded.revenue;

SELECT * FROM daily_revenue;`,
    },
    check: {
      question: 'Which load is idempotent?',
      options: ['INSERT every extracted row', 'INSERT … ON CONFLICT DO UPDATE on a unique key', 'Append with a new run ID', 'COPY into a table with no keys'],
      answer: 1,
      explanation: 'An upsert on a unique key overwrites the same rows on re-runs instead of duplicating them.',
    },
  },

  [`${E}/error-handling-retries`]: {
    answer: 'Robust pipelines classify errors first: retry transient ones (timeouts, 5xx, 429, deadlocks) with exponential backoff and jitter, fail fast on permanent ones (bad credentials, schema mismatch), and send records that cannot be processed to a dead letter queue instead of blocking the pipeline.',
    points: [
      'Backoff: delay = min(base × 2^attempt, cap), with random jitter.',
      'On 429, wait for the Retry-After header.',
      'A circuit breaker stops calling a dependency that keeps failing.',
    ],
    example: {
      label: 'Exponential backoff delays with a cap',
      lang: 'python',
      code: `base, cap = 1.0, 30.0
for attempt in range(7):
    delay = min(base * 2 ** attempt, cap)
    print(f"attempt {attempt + 1}: wait up to {delay:.0f}s")`,
    },
    check: {
      question: 'Why add random jitter to retry delays?',
      options: ['To make retries faster', 'So many clients do not retry at the same instant and overload the service again', 'To satisfy the API', 'It is only for logging'],
      answer: 1,
      explanation: 'Without jitter, clients that failed together retry together, causing synchronised spikes.',
    },
  },

  [`${E}/pipeline-orchestration`]: {
    answer: 'An orchestrator such as Airflow decides what runs, in what order, under which conditions, with retries, timeouts and alerts. Pipelines are DAGs of tasks; the scheduler creates runs for each data interval, and backfills rerun past intervals.',
    points: [
      'Cron says when; an orchestrator also handles dependencies, retries and state.',
      'Airflow\'s logical date is the start of the interval being processed.',
      'Keep tasks idempotent so retries and backfills are safe.',
    ],
    example: {
      label: 'A minimal Airflow DAG',
      lang: 'python',
      code: `from datetime import datetime
from airflow import DAG
from airflow.operators.python import PythonOperator

with DAG("orders_daily", start_date=datetime(2024, 3, 1),
         schedule="0 6 * * *", catchup=False) as dag:
    extract = PythonOperator(task_id="extract", python_callable=extract_orders)
    load = PythonOperator(task_id="load", python_callable=load_orders, retries=3)
    extract >> load`,
      static: true,
    },
    check: {
      question: 'A daily DAG runs at 06:00 on March 17. Which day\'s data does its logical date refer to?',
      options: ['March 17', 'March 16', 'March 18', 'Today\'s date at run time'],
      answer: 1,
      explanation: 'The run for an interval starts after the interval ends, so the logical date is the interval start: March 16.',
    },
  },

  [`${E}/data-lake-architecture`]: {
    answer: 'A data lake stores raw data of any format on cheap object storage, separates compute from storage, and applies schema when data is read. Organising it into zones (landing, bronze, silver, gold) with formats, partitions and a catalogue keeps it usable.',
    points: [
      'Landing is immutable raw input.',
      'Convert to Parquet and partition early.',
      'Without governance a lake becomes a swamp.',
    ],
    example: {
      label: 'Zones in an S3-based lake',
      lang: 'text',
      code: `s3://lake/landing/orders/2024-03-15/export.csv      raw, as received
s3://lake/bronze/orders/date=2024-03-15/*.parquet   typed, Parquet
s3://lake/silver/orders/                            cleaned, deduplicated (Delta)
s3://lake/gold/daily_revenue/                       business-ready`,
      static: true,
    },
    check: {
      question: 'What does schema-on-read mean?',
      options: ['Schemas are checked when data is written', 'Structure is applied when data is queried', 'There is never a schema', 'Only JSON is allowed'],
      answer: 1,
      explanation: 'The lake accepts files as they are; the query engine interprets their structure at read time.',
    },
  },

  [`${E}/medallion-architecture`]: {
    answer: 'The medallion architecture organises a lakehouse into three layers of rising quality: bronze holds raw data as received, silver holds cleaned, typed and deduplicated current records, and gold holds business-level aggregates ready for dashboards and models.',
    points: [
      'Bronze is append-only; never apply business logic there.',
      'Silver is one row per business key; bronze keeps the history.',
      'Gold tables are shaped for specific consumers.',
    ],
    example: {
      label: 'Silver to gold: delivered revenue per store',
      lang: 'sql',
      code: `SELECT s.store_name,
       COUNT(*) AS delivered_orders,
       ROUND(SUM(o.total_amount), 2) AS revenue
FROM orders AS o
JOIN stores AS s ON s.store_id = o.store_id
WHERE o.order_status = 'Delivered'
GROUP BY s.store_name
ORDER BY revenue DESC
LIMIT 4;`,
    },
    check: {
      question: 'In which layer do deduplication and type casting belong?',
      options: ['Bronze', 'Silver', 'Gold', 'Landing'],
      answer: 1,
      explanation: 'Bronze keeps data as received; silver is where it becomes trusted: typed, cleaned and deduplicated.',
    },
  },

  [`${E}/warehouse-concepts`]: {
    answer: 'Cloud warehouses are fast because they store data by column, compress it heavily, skip blocks using metadata, and separate storage from compute so you can size compute per workload. Snowflake, for example, has a services layer, virtual warehouses and micro-partitioned storage.',
    points: [
      'A query on 3 of 200 columns reads about 1.5% of the data.',
      'Correct data types compress better than strings.',
      'Clustering keys help skip micro-partitions on large tables.',
    ],
    example: {
      label: 'An analytic query that touches only two columns',
      lang: 'sql',
      code: `SELECT payment_method, ROUND(SUM(total_amount), 2) AS revenue
FROM orders
GROUP BY payment_method
ORDER BY revenue DESC;`,
    },
    check: {
      question: 'Why does columnar storage compress well?',
      options: ['It deletes old data', 'Values in one column share a type and repeat often', 'It stores less precision', 'It only keeps indexes'],
      answer: 1,
      explanation: 'Similar values stored together suit run-length, dictionary and delta encoding.',
    },
  },

  [`${E}/lakehouse-architecture`]: {
    answer: 'A lakehouse puts warehouse features on top of a data lake: open table formats (Delta Lake, Apache Iceberg, Apache Hudi) add ACID commits, schema enforcement, time travel and fast metadata to Parquet files on object storage, and many engines (Spark, Trino, Snowflake) can query the same tables.',
    points: [
      'One copy of data serves BI and ML, instead of a lake plus a warehouse.',
      'A transaction log commit makes new files visible atomically.',
      'Time travel reads a table as it was at an earlier version.',
    ],
    example: {
      label: 'Delta Lake: write, then read an older version',
      lang: 'python',
      code: `df.write.format("delta").mode("append").save("s3://lake/silver/orders")

latest = spark.read.format("delta").load("s3://lake/silver/orders")
yesterday = (spark.read.format("delta")
             .option("versionAsOf", 41)
             .load("s3://lake/silver/orders"))`,
      static: true,
    },
    check: {
      question: 'How does Delta Lake make a write atomic on S3?',
      options: ['It locks the bucket', 'New files become visible only when a single log entry commits them', 'It writes one huge file', 'S3 is transactional by itself'],
      answer: 1,
      explanation: 'Readers follow the transaction log; until the commit entry exists, the new files are ignored.',
    },
  },

  [`${E}/data-modelling`]: {
    answer: 'Dimensional modelling splits analytics data into fact tables (numeric measurements of business events at a declared grain) and dimension tables (the who, what, where and when that describe them). A star schema joins one fact table directly to its dimensions.',
    points: [
      'Declare the grain first: exactly what one fact row represents.',
      'Facts hold measures; dimensions hold descriptive attributes.',
      'Surrogate keys decouple the warehouse from source system IDs.',
    ],
    example: {
      label: 'A star query: a fact table joined to two dimensions',
      lang: 'sql',
      code: `SELECT p.category, s.city, SUM(oi.line_total) AS sales   -- fact: order_items
FROM order_items AS oi
JOIN products AS p ON p.product_id = oi.product_id        -- product dimension
JOIN orders   AS o ON o.order_id = oi.order_id
JOIN stores   AS s ON s.store_id = o.store_id             -- store dimension
GROUP BY p.category, s.city
ORDER BY sales DESC
LIMIT 5;`,
    },
    check: {
      question: 'What is the grain of a fact table?',
      options: ['Its number of columns', 'Exactly what one row represents', 'Its storage format', 'Its refresh schedule'],
      answer: 1,
      explanation: 'For example "one row per order line". Every measure and key in the table must fit that grain.',
    },
  },

  [`${E}/slowly-changing-dimensions`]: {
    answer: 'Slowly changing dimensions decide what happens to history when a dimension attribute changes. Type 1 overwrites it, Type 2 adds a new row version with valid_from and valid_to dates so old facts keep their old context, and Type 3 keeps the previous value in an extra column.',
    points: [
      'Type 2 is the most common when history matters.',
      'Expire the current row and insert the new version together.',
      'Join facts to the version valid at the event date.',
    ],
    example: {
      label: 'A Type 2 history: a customer moves cities',
      lang: 'sql',
      code: `CREATE TABLE dim_customer (customer_id INT, city TEXT, valid_from TEXT, valid_to TEXT, is_current INT);
INSERT INTO dim_customer VALUES (7, 'Austin', '2023-01-01', NULL, 1);

UPDATE dim_customer SET valid_to = '2024-03-01', is_current = 0
WHERE customer_id = 7 AND is_current = 1;
INSERT INTO dim_customer VALUES (7, 'Denver', '2024-03-01', NULL, 1);

SELECT * FROM dim_customer ORDER BY valid_from;`,
    },
    check: {
      question: 'Which SCD type keeps the full history of an attribute?',
      options: ['Type 0', 'Type 1', 'Type 2', 'Type 3'],
      answer: 2,
      explanation: 'Type 2 adds a row per version. Type 1 overwrites, and Type 3 keeps only one previous value.',
    },
  },

  [`${E}/data-vault`]: {
    answer: 'Data Vault 2.0 models raw data as hubs (business keys), links (relationships between hubs) and satellites (descriptive attributes with full history). Hash keys computed from business keys let every table load in parallel without lookups.',
    points: [
      'Hubs record that an entity exists; satellites record how it changes.',
      'A satellite gets a new row only when its hash_diff changes.',
      'Business-friendly marts are built on top for reporting.',
    ],
    example: {
      label: 'Deterministic hash keys from business keys',
      lang: 'python',
      code: `import hashlib

def hash_key(*parts):
    text = "||".join(p.strip().upper() for p in parts)
    return hashlib.md5(text.encode()).hexdigest()

print("hub_customer:", hash_key("cust-0007"))
print("same key, messy input:", hash_key("  CUST-0007 ") == hash_key("cust-0007"))
print("link_order_customer:", hash_key("ord-1042", "cust-0007"))`,
    },
    check: {
      question: 'What does a Data Vault hub store?',
      options: ['Descriptive attributes', 'Business keys', 'Aggregated metrics', 'Relationships'],
      answer: 1,
      explanation: 'Hubs hold business keys; links hold relationships; satellites hold attributes and history.',
    },
  },

  [`${E}/data-quality`]: {
    answer: 'Data quality is measured on six dimensions (completeness, accuracy, consistency, timeliness, uniqueness and validity) and enforced with tests at every layer, such as dbt\'s not_null, unique, accepted_values and relationships. Catching a problem at ingestion is far cheaper than in a dashboard.',
    points: [
      'Test at bronze, silver and gold, not just at the end.',
      'Data contracts agree schemas and rules with producers.',
      'Anomaly detection catches what fixed tests miss, such as sudden volume drops.',
    ],
    example: {
      label: 'Quality checks as queries that should return zero',
      lang: 'sql',
      code: `SELECT 'null customer' AS check_name, COUNT(*) AS failures FROM orders WHERE customer_id IS NULL
UNION ALL
SELECT 'duplicate order_id', COUNT(*) - COUNT(DISTINCT order_id) FROM orders
UNION ALL
SELECT 'negative total', COUNT(*) FROM orders WHERE total_amount < 0
UNION ALL
SELECT 'unknown status', COUNT(*) FROM orders
WHERE order_status NOT IN ('Delivered', 'Processing', 'Cancelled', 'Returned');`,
    },
    check: {
      question: 'Which dbt test checks that every orders.customer_id exists in customers?',
      options: ['unique', 'not_null', 'accepted_values', 'relationships'],
      answer: 3,
      explanation: 'relationships verifies referential integrity between a column and another model\'s key.',
    },
  },

  [`${E}/monitoring-observability`]: {
    answer: 'Data observability uses metrics (row counts, durations, error rates), structured logs and lineage to tell you when data is late, incomplete or wrong. SLIs measure, SLOs set internal targets, and SLAs are promises to the business; alerts are tiered by urgency.',
    points: [
      'Set SLOs stricter than SLAs to leave a buffer.',
      'Page only for imminent SLA breaches; send the rest to chat.',
      'Alert on anomalies such as a sudden drop in row count.',
    ],
    example: {
      label: 'Flag a day whose row count drops far below normal',
      lang: 'python',
      code: `from statistics import mean, stdev

counts = {"03-10": 10_120, "03-11": 9_980, "03-12": 10_340, "03-13": 10_050, "03-14": 4_210}
history = list(counts.values())[:-1]
today = counts["03-14"]
z = (today - mean(history)) / stdev(history)
print(f"z-score {z:.1f}:", "ALERT, volume anomaly" if abs(z) > 3 else "ok")`,
    },
    check: {
      question: 'What is the difference between an SLO and an SLA?',
      options: ['They are the same', 'An SLO is an internal target; an SLA is an external promise', 'An SLA is internal; an SLO is external', 'SLOs are only for streaming'],
      answer: 1,
      explanation: 'Teams aim for the SLO so that the business-facing SLA is met with room to spare.',
    },
  },

  [`${E}/data-governance`]: {
    answer: 'Data governance makes data findable, traceable, protected and compliant: a catalogue so people can discover datasets, lineage to trace each column back to its source, access control (with PII masking) so the right people see the right data, and policies for regulations such as GDPR.',
    points: [
      'Column-level lineage shows the impact of a schema change before you make it.',
      'Mask or tokenise PII outside production.',
      'Tools such as DataHub ingest metadata from dbt, warehouses and Airflow.',
    ],
    example: {
      label: 'Masking PII for analysts who do not need it',
      lang: 'sql',
      code: `SELECT customer_id,
       SUBSTR(first_name, 1, 1) || '***' AS first_name,
       '***' || SUBSTR(email, INSTR(email, '@')) AS email,
       city
FROM customers
LIMIT 3;`,
    },
    check: {
      question: 'What does column-level lineage tell you?',
      options: ['Who owns the table', 'Which source columns feed each downstream column', 'The table\'s size', 'Its refresh schedule'],
      answer: 1,
      explanation: 'It traces each column back to its sources, so you can see what a change upstream would break.',
    },
  },

  [`${E}/security-compliance`]: {
    answer: 'Data engineers secure data in transit (TLS) and at rest (encryption), restrict access with least privilege, treat personally identifiable information (PII) carefully, and build pipelines that can meet GDPR and CCPA duties such as deleting or exporting a person\'s data on request.',
    points: [
      'Encryption in transit and at rest are separate; you need both.',
      'Tag, minimise and mask PII; keep it out of dev environments.',
      'Design deletion and access-export into every pipeline that touches personal data.',
    ],
    example: {
      label: 'A right-to-erasure request across tables',
      lang: 'sql',
      code: `-- delete a person's data; keep anonymised facts for reporting
BEGIN;
UPDATE orders SET customer_id = NULL WHERE customer_id = 20;
DELETE FROM customers WHERE customer_id = 20;
COMMIT;

SELECT COUNT(*) AS remaining FROM customers WHERE customer_id = 20;`,
    },
    check: {
      question: 'Which right lets a person ask a company to delete their personal data?',
      options: ['Right to portability', 'Right to erasure', 'Right to object', 'Purpose limitation'],
      answer: 1,
      explanation: 'GDPR\'s right to erasure (and CCPA\'s right to delete) require removing the person\'s data on request.',
    },
  },

  [`${E}/streaming-data`]: {
    answer: 'A stream is an ordered, replayable, append-only log of immutable events. Producers append events, consumers read them at their own pace and track their position (offset), and partitions split a stream so many consumers can share the work.',
    points: [
      'Streams are unbounded; there is no "end of the data".',
      'Corrections are new events; nothing is updated in place.',
      'Event time (when it happened) differs from processing time.',
    ],
    example: {
      label: 'Two consumers reading the same log at their own offsets',
      lang: 'python',
      code: `log = ["order_created:1001", "order_paid:1001", "order_created:1002", "order_shipped:1001"]
offsets = {"billing": 0, "analytics": 0}

def poll(consumer, n):
    start = offsets[consumer]
    batch = log[start:start + n]
    offsets[consumer] += len(batch)
    return batch

print("billing  ", poll("billing", 3))
print("analytics", poll("analytics", 1))
print("offsets  ", offsets)`,
    },
    check: {
      question: 'How is a mistake in an event stream corrected?',
      options: ['Edit the event in place', 'Append a new correcting event', 'Delete the partition', 'Restart the producer'],
      answer: 1,
      explanation: 'Events are immutable, which is what makes replay and audit possible; fixes are new events.',
    },
  },

  [`${E}/message-brokers-queues`]: {
    answer: 'A message broker decouples producers from consumers in time, location and speed. A queue hands each message to one consumer and removes it (work distribution); a topic keeps messages for every subscriber until retention expires (fan-out and replay).',
    points: [
      'The commit log is append-only and sequential, which is why brokers are fast.',
      'Replication across brokers protects against losing a node.',
      'A dead letter queue holds messages that keep failing.',
    ],
    example: {
      label: 'A queue consumes messages; a topic keeps them for everyone',
      lang: 'python',
      code: `from collections import deque

queue = deque(["job-1", "job-2", "job-3"])
workers = {"w1": [], "w2": []}
for i in range(len(queue)):
    workers["w1" if i % 2 == 0 else "w2"].append(queue.popleft())
print("queue:", workers, "| left:", list(queue))

topic = ["evt-1", "evt-2"]
print("topic: billing sees", topic, "| analytics sees", topic)`,
    },
    check: {
      question: 'Several services must each receive every order event. Which fits?',
      options: ['A work queue', 'A topic with one subscription per service', 'A cron job', 'A shared database table'],
      answer: 1,
      explanation: 'A topic delivers every message to every subscriber; a queue would split messages between them.',
    },
  },

  [`${E}/distributed-systems`]: {
    answer: 'Distributed data systems spread data and work across machines, which brings trade-offs: under a network partition you choose consistency or availability (CAP), replicas can lag, data must be partitioned (sharded) by a key, and failures mean messages may be delivered more than once.',
    points: [
      'Consistency ranges from linearisable to eventual.',
      'Reads from followers can be stale.',
      'Design consumers to handle duplicate messages (at-least-once).',
    ],
    example: {
      label: 'Hash partitioning spreads keys across shards',
      lang: 'python',
      code: `import hashlib

def shard(key, shards=3):
    return int(hashlib.md5(key.encode()).hexdigest(), 16) % shards

placement = {}
for customer in ["cust-1", "cust-2", "cust-3", "cust-4", "cust-5", "cust-6"]:
    placement.setdefault(shard(customer), []).append(customer)
print(dict(sorted(placement.items())))`,
    },
    check: {
      question: 'During a network partition, what does the CAP theorem say you must choose between?',
      options: ['Speed and cost', 'Consistency and availability', 'Durability and isolation', 'Reads and writes'],
      answer: 1,
      explanation: 'Partitions are unavoidable, so during one a system either rejects some requests or serves possibly stale data.',
    },
  },

  [`${E}/performance-tuning`]: {
    answer: 'Tune performance by first diagnosing the bottleneck: too much data read (I/O), heavy computation (CPU), spills to disk (memory) or large shuffles (network). Then apply the matching fix: partition pruning and column pruning, broadcast joins, fewer shuffles, or incremental processing.',
    points: [
      'Shuffles (joins, groupBy, distinct) are the most expensive Spark operations.',
      'Broadcast a small table to avoid shuffling a large one.',
      'Filter on partition columns so whole directories are skipped.',
    ],
    example: {
      label: 'Broadcasting a small dimension in Spark',
      lang: 'python',
      code: `from pyspark.sql.functions import broadcast

orders = spark.read.parquet("s3://lake/silver/orders").where("order_date = '2024-03-15'")
stores = spark.read.parquet("s3://lake/silver/stores")          # 10 rows

daily = orders.join(broadcast(stores), "store_id").groupBy("city").sum("total_amount")`,
      static: true,
    },
    check: {
      question: 'Which join strategy avoids shuffling a huge table?',
      options: ['Sort-merge join', 'Broadcast join of the small table', 'Cartesian join', 'A full outer join'],
      answer: 1,
      explanation: 'Sending the small table to every executor lets each join its local part of the big table, with no shuffle.',
    },
  },

  [`${E}/cicd-pipelines`]: {
    answer: 'CI/CD for data tests pipeline changes before they reach production: each pull request builds and tests the changed models in an isolated environment (often a zero-copy clone of production), and merges deploy automatically. Data bugs look like valid numbers, so the testing has to be thorough.',
    points: [
      'Use separate dev, CI and production environments.',
      'Slim CI builds only the changed models and their dependents.',
      'Block a merge when tests fail.',
    ],
    example: {
      label: 'A pull-request job that tests only what changed',
      lang: 'yaml',
      code: `on: pull_request
jobs:
  dbt-ci:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: pip install dbt-snowflake
      - run: dbt build --select state:modified+ --defer --state prod-artifacts/`,
      static: true,
    },
    check: {
      question: 'What does dbt build --select state:modified+ run?',
      options: ['Every model', 'Changed models and everything downstream of them', 'Only tests', 'Only seeds'],
      answer: 1,
      explanation: 'state:modified picks changed models; the + adds their dependents, which is what slim CI needs.',
    },
  },

  [`${E}/infrastructure-as-code`]: {
    answer: 'Infrastructure as code defines cloud resources (buckets, warehouses, roles) in version-controlled files and applies them with a tool such as Terraform: init, then plan to preview changes, then apply. State maps the code to real resources and is shared remotely with locking.',
    points: [
      'Always read the plan before applying.',
      'Use remote state with locking (for example S3 plus DynamoDB).',
      'Changes go through pull requests like any other code.',
    ],
    example: {
      label: 'A Terraform resource for a data bucket',
      lang: 'text',
      code: `resource "aws_s3_bucket" "lake" {
  bucket = "acme-data-lake-prod"
  tags   = { team = "data", env = "prod" }
}

$ terraform plan     # + aws_s3_bucket.lake will be created
$ terraform apply`,
      static: true,
    },
    check: {
      question: 'Which Terraform command shows what will change without changing anything?',
      options: ['terraform init', 'terraform plan', 'terraform apply', 'terraform state rm'],
      answer: 1,
      explanation: 'plan compares code with state and real resources and prints the changes; apply makes them.',
    },
  },

  [`${E}/system-design-de`]: {
    answer: 'Data system design follows a framework: clarify requirements (volume, velocity, latency, consistency, cost), estimate capacity, define the data model, sketch the architecture, choose and justify components, then address the hard problems and failure modes.',
    points: [
      'Ask about requirements before drawing anything.',
      'Back tool choices with capacity numbers.',
      'Explain how the design fails and how you would know.',
    ],
    example: {
      label: 'A back-of-the-envelope capacity estimate',
      lang: 'python',
      code: `events_per_day = 50_000_000
bytes_per_event = 500
per_day_gb = events_per_day * bytes_per_event / 1e9
peak_per_sec = events_per_day / 86_400 * 3          # assume 3x the average at peak
print(f"{per_day_gb:.0f} GB/day raw, {per_day_gb * 365 / 1000:.1f} TB/year")
print(f"peak about {peak_per_sec:,.0f} events/second")`,
    },
    check: {
      question: 'What should come first in a system design interview?',
      options: ['Pick Kafka and Spark', 'Clarify requirements such as volume and latency', 'Draw the architecture', 'Estimate cloud cost'],
      answer: 1,
      explanation: 'Every later choice depends on the requirements; a design for 10 thousand events a day differs from one for 10 million.',
    },
  },

  [`${E}/de-interview-questions`]: {
    answer: 'Data engineering interviews cover Python (generators, error handling), SQL (window functions, deduplication), pipeline design (idempotency, incremental loads, backfills), modelling (star schema, SCD Type 2), Spark and Kafka internals, and system design, plus how you handled real incidents.',
    points: [
      'Name the mechanism that makes a pipeline idempotent.',
      'Know RANK vs DENSE_RANK vs ROW_NUMBER cold.',
      'Tell incident stories with impact, cause, fix and prevention.',
    ],
    example: {
      label: 'A favourite pattern: keys that repeat (customers with 2+ orders)',
      lang: 'sql',
      code: `SELECT customer_id, COUNT(*) AS orders
FROM orders
GROUP BY customer_id
HAVING COUNT(*) > 1
ORDER BY orders DESC, customer_id
LIMIT 5;`,
    },
    check: {
      question: 'A pipeline sometimes runs twice for the same day. What design keeps the result correct?',
      options: ['Add more logging', 'Make the load idempotent, for example an upsert on a natural key', 'Run it less often', 'Use a bigger cluster'],
      answer: 1,
      explanation: 'An idempotent write produces the same final state no matter how many times it runs.',
    },
  },
}
