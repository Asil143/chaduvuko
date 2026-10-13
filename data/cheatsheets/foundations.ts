import type { TrackCheatSheet } from '@/lib/cheatsheet'

export const foundationsCheatSheet: TrackCheatSheet = {
  track: 'foundations',
  title: 'Data Engineering Foundations',
  trackHref: '/learn/what-is-data-engineering',
  accent: '#10b981',
  blurb: 'The four opening lessons on one page: what the job is, the SQL a pipeline needs, PostgreSQL, and Python for moving data.',
  sections: [
    {
      title: 'The job',
      entries: [
        { label: 'What you build', code: `source → pipeline → warehouse → people\n# you own the path, not the chart` },
        { label: 'Batch vs streaming', code: `batch:     a file or table, on a schedule\nstreaming: an event, as it happens\n# start with batch unless the decision cannot wait` },
        { label: 'Medallion', code: `bronze  raw, as landed\nsilver  cleaned, typed, deduped\ngold    shaped for a question` },
      ],
    },
    {
      title: 'SQL a pipeline uses',
      entries: [
        { label: 'Orphan rows', code: `SELECT o.order_id\nFROM orders o\nLEFT JOIN customers c\n  ON o.customer_id = c.customer_id\nWHERE c.customer_id IS NULL;` },
        { label: 'Keep the latest row', code: `SELECT * FROM (\n  SELECT *, ROW_NUMBER() OVER (\n    PARTITION BY id ORDER BY updated_at DESC) AS rn\n  FROM src) t\nWHERE rn = 1;` },
        { label: 'Aggregate before you join', code: `SELECT c.city, s.total\nFROM customers c\nJOIN (\n  SELECT customer_id, SUM(amount) AS total\n  FROM orders GROUP BY customer_id\n) s ON s.customer_id = c.customer_id;` },
      ],
    },
    {
      title: 'PostgreSQL',
      entries: [
        { label: 'Table', code: `CREATE TABLE events (\n  id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,\n  user_id bigint NOT NULL,\n  happened_at timestamptz NOT NULL DEFAULT now()\n);` },
        { label: 'Load a file', code: `\\copy events (user_id, happened_at)\nFROM 'events.csv' CSV HEADER;` },
        { label: 'Index the filter', code: `CREATE INDEX events_user_time\nON events (user_id, happened_at DESC);` },
      ],
    },
    {
      title: 'Python for data',
      entries: [
        { label: 'Read and write', code: `import csv\nwith open('in.csv') as src, open('out.csv', 'w') as dst:\n    rows = csv.DictReader(src)\n    writer = csv.DictWriter(dst, fieldnames=rows.fieldnames)\n    writer.writeheader()\n    writer.writerows(row for row in rows if row['id'])` },
        { label: 'Fail on a bad row', code: `try:\n    amount = int(row['amount'])\nexcept ValueError:\n    reject(row)\n    continue` },
        { label: 'Idempotent key', code: `# run the job twice, land the row once\nINSERT INTO events (id, payload)\nVALUES (%s, %s)\nON CONFLICT (id) DO NOTHING;` },
      ],
    },
  ],
  projects: [
    { title: 'One-table quality check', level: 'Beginner', build: 'Load a CSV of orders into PostgreSQL and write three queries: null keys, duplicate ids, and amounts that are not numbers.', skills: ['PostgreSQL', 'COPY', 'data quality'] },
    { title: 'Bronze to silver', level: 'Beginner', build: 'Land a raw CSV as bronze, then a SQL view or table that dedupes on id and keeps the latest updated_at as silver.', skills: ['SQL', 'ROW_NUMBER', 'medallion'] },
    { title: 'Orphan report', level: 'Intermediate', build: 'Two tables, orders and customers. A Python script loads both and prints every order whose customer_id has no match.', skills: ['LEFT JOIN', 'csv', 'Python'] },
    { title: 'Daily batch', level: 'Intermediate', build: 'A script that reads yesterday’s file only, upserts into PostgreSQL, and writes a one-line log of rows in, rows rejected, rows written.', skills: ['idempotency', 'logging', 'upsert'] },
    { title: 'Tiny warehouse', level: 'Advanced', build: 'Bronze files by date, a silver table, and one gold query a teammate could paste into a dashboard: revenue by day and city.', skills: ['medallion', 'aggregation', 'schema'] },
  ],
}
