import type { TrackCheatSheet } from '@/lib/cheatsheet'

export const dataEngineeringCheatSheet: TrackCheatSheet = {
  track: 'data-engineering',
  title: 'Data Engineering',
  trackHref: '/learn/data-engineering',
  accent: '#22c55e',
  blurb: 'The patterns a data engineer uses every day — SQL, Python pipelines, file formats, the shell, orchestration and the medallion architecture — on one page.',
  sections: [
    {
      title: 'Analytical SQL',
      entries: [
        { label: 'Window function', code: `SELECT customer_id, order_date,\n  ROW_NUMBER() OVER (\n    PARTITION BY customer_id\n    ORDER BY order_date DESC) AS rn\nFROM orders;` },
        { label: 'Deduplicate (keep latest)', code: `WITH ranked AS (\n  SELECT *, ROW_NUMBER() OVER (\n    PARTITION BY id ORDER BY updated_at DESC) rn\n  FROM src)\nSELECT * FROM ranked WHERE rn = 1;` },
        { label: 'Running total', code: `SUM(amount) OVER (\n  ORDER BY day\n  ROWS BETWEEN UNBOUNDED PRECEDING\n           AND CURRENT ROW)` },
        { label: 'Period over period', code: `amount - LAG(amount, 1, 0) OVER (ORDER BY month)` },
      ],
    },
    {
      title: 'Python pipeline',
      entries: [
        { label: 'Chunked read', code: `for chunk in pd.read_csv(path, chunksize=100_000):\n    process(chunk)   # constant memory` },
        { label: 'Retry with backoff', code: `delay = min(base * 2 ** attempt, cap)\n# respect Retry-After on HTTP 429` },
        { label: 'Atomic checkpoint', code: `tmp = path + ".tmp"\njson.dump(state, open(tmp, "w"))\nos.replace(tmp, path)   # write-then-rename` },
        { label: 'Idempotent upsert', code: `INSERT INTO t (...) VALUES (...)\nON CONFLICT (id) DO UPDATE SET ...;` },
      ],
    },
    {
      title: 'File formats',
      entries: [
        { label: 'When to use', code: `CSV / JSON   exchange, small, human-readable\nParquet / ORC  analytics (columnar, compressed)\nAvro          streaming, schema attached` },
        { label: 'Partitioned layout', code: `s3://lake/bronze/orders/\n  date=2024-03-15/part-0001.parquet\n# filter on date -> partition pruning` },
        { label: 'Convert CSV to Parquet', code: `import pyarrow.parquet as pq, pyarrow.csv as csv\npq.write_table(csv.read_csv("in.csv"), "out.parquet")` },
      ],
    },
    {
      title: 'Linux & shell',
      entries: [
        { label: 'Inspect first', code: `df -h /data          # disk space\ndu -sh /path/*       # dir sizes\ntail -f pipeline.log` },
        { label: 'Rank a column', code: `cut -d, -f4 data.csv | sort | uniq -c | sort -rn | head` },
        { label: 'Permissions', code: `chmod 600 secrets.env   # owner only\n755 scripts   644 configs` },
        { label: 'Cron', code: `# min hour dom mon dow\n0 2 * * *  /opt/etl/run.sh >> /var/log/etl.log 2>&1` },
      ],
    },
    {
      title: 'Ingestion patterns',
      entries: [
        { label: 'Three patterns', code: `Full load      copy all, replace\nIncremental    WHERE updated_at > watermark\nCDC            read the transaction log (deletes too)` },
        { label: 'Incremental extract', code: `SELECT * FROM src\nWHERE updated_at > :last_watermark\nORDER BY updated_at;` },
        { label: 'Loading', code: `full replace   truncate + reload\nappend-only    immutable events\nupsert         mutable entities (default)` },
      ],
    },
    {
      title: 'Medallion architecture',
      entries: [
        { label: 'Three layers', code: `Bronze  raw, as received, append-only\nSilver  cleaned, typed, deduplicated\nGold    business aggregates, ready to serve` },
        { label: 'Silver (dedup + type)', code: `SELECT id, CAST(amount AS DECIMAL(10,2)) amount\nFROM (SELECT *, ROW_NUMBER() OVER (\n  PARTITION BY id ORDER BY ts DESC) rn FROM bronze)\nWHERE rn = 1;` },
      ],
    },
    {
      title: 'Orchestration (Airflow)',
      entries: [
        { label: 'DAG', code: `with DAG("daily", schedule="0 6 * * *",\n         start_date=..., catchup=False) as dag:\n    extract >> transform >> load` },
        { label: 'Logical date', code: `# a daily run at 06:00 Mar 17\n# has logical_date = Mar 16 (interval start)` },
        { label: 'Retries', code: `PythonOperator(task_id="load",\n  python_callable=load, retries=3,\n  retry_delay=timedelta(minutes=5))` },
      ],
    },
    {
      title: 'Data quality',
      entries: [
        { label: 'Checks (should be 0)', code: `SELECT COUNT(*) FROM orders WHERE customer_id IS NULL;\nSELECT COUNT(*) - COUNT(DISTINCT id) FROM orders;` },
        { label: 'dbt generic tests', code: `columns:\n  - name: id\n    tests: [unique, not_null]\n  - name: customer_id\n    tests:\n      - relationships: { to: ref('customers'), field: id }` },
        { label: 'Six dimensions', code: `completeness  accuracy  consistency\ntimeliness    uniqueness  validity` },
      ],
    },
    {
      title: 'Reliability',
      entries: [
        { label: 'Idempotency', code: `# running N times == running once\n- upsert on a unique key\n- fixed extraction windows (not "last 24h")\n- deduplicate by event_id` },
        { label: 'Error classes', code: `transient  (timeout, 5xx, 429)  -> retry w/ backoff\npermanent  (401, schema)        -> fail fast -> DLQ` },
      ],
    },
  ],
  projects: [
    { title: 'CSV-to-Parquet pipeline', level: 'Beginner', build: 'Read daily CSVs from a landing folder, validate the schema, convert to partitioned Parquet in a bronze zone, and log row counts.', skills: ['Python', 'Parquet', 'partitioning', 'validation'] },
    { title: 'API ingestion with watermarks', level: 'Intermediate', build: 'Pull from a paginated REST API incrementally using a saved watermark, retry transient errors, and upsert into a warehouse table. Make it safe to rerun.', skills: ['APIs', 'incremental load', 'idempotency', 'checkpoints'] },
    { title: 'Medallion batch pipeline', level: 'Intermediate', build: 'Build bronze → silver → gold for a public dataset: raw ingest, dedup and typing, then a daily gold aggregate, orchestrated with Airflow.', skills: ['medallion', 'Airflow', 'SQL', 'dbt'] },
    { title: 'Data quality framework', level: 'Advanced', build: 'A reusable set of checks (nulls, ranges, uniqueness, referential integrity) that run on every batch, store failures, and alert on anomalies.', skills: ['data quality', 'anomaly detection', 'alerting'] },
    { title: 'Streaming CDC to lakehouse', level: 'Advanced', build: 'Capture changes from a database with Debezium into Kafka, then land them in a Delta/Iceberg table with MERGE for exactly-once current state.', skills: ['CDC', 'Kafka', 'lakehouse', 'MERGE'] },
  ],
}
