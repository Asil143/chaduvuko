import { BulletList, Callout, CodeBox, Divider, HighlightBox, KeyTakeaways, LearnLayout, Para, SectionTag, SectionTitle, SubTitle, Table } from './_shared'

export default function SemiStructuredData() {
  return (
    <LearnLayout
      title="Semi-Structured Data: VARIANT, JSON, FLATTEN"
      description="Load and query JSON in Snowflake with VARIANT, OBJECT, ARRAY, path notation, casting, LATERAL FLATTEN, schema drift handling, and production modeling patterns."
      section="Snowflake — Module 06"
      readTime="70 min"
      updatedAt="September 2026"
      breadcrumbs={[
        { label: 'Learn', href: '/learn' },
        { label: 'Snowflake', href: '/learn/snowflake' },
        { label: 'Semi-Structured Data', href: '/learn/snowflake/semi-structured-data' },
      ]}
      prev={{ title: 'Loading Data with Stages and COPY INTO', href: '/learn/snowflake/loading-data' }}
      next={{ title: 'ELT and Medallion Architecture in Snowflake', href: '/learn/snowflake/elt-medallion' }}
    >
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 01 — The plain-English idea" />
        <SectionTitle>Snowflake Can Store Messy JSON Before You Fully Model It</SectionTitle>
        <Para>
          Real business data does not always arrive as clean rows and columns. APIs send nested JSON.
          Product applications emit flexible event payloads. Payment processors add optional fields.
          Marketing tools return arrays of campaign attributes. A partner may add a new field without
          telling your team first. Semi-structured data is the name for this kind of flexible, nested,
          not-perfectly-tabular data.
        </Para>
        <Para>
          Snowflake handles semi-structured data with data types such as VARIANT, OBJECT, and ARRAY.
          The most important one is VARIANT. A VARIANT column can hold JSON-like values: objects, arrays,
          strings, numbers, booleans, and nulls. This lets you land raw payloads safely first, then extract
          stable fields later into clean relational tables.
        </Para>
        <HighlightBox>
          <Para>
            <strong>Plain-English definition:</strong> VARIANT is Snowflake's flexible container for JSON-like
            data. It is excellent for raw ingestion and exploration, but production analytics should usually
            expose typed columns in Silver or Gold tables.
          </Para>
        </HighlightBox>
        <Callout title="Everyday analogy">
          Imagine receiving customer forms where some people fill out apartment number, some include company
          name, some include multiple phone numbers, and some leave optional fields blank. VARIANT lets you
          keep the whole form without throwing away fields just because they do not fit your final table yet.
        </Callout>
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 02 — Data types" />
        <SectionTitle>VARIANT, OBJECT, and ARRAY</SectionTitle>
        <Para>
          Snowflake uses normal relational types such as STRING, NUMBER, BOOLEAN, DATE, and TIMESTAMP.
          Semi-structured data adds flexible types. You do not need to memorize every internal detail first.
          Start by learning what kind of JSON shape each type represents.
        </Para>
        <Table
          headers={['Type', 'What it stores', 'JSON example', 'How you usually use it']}
          rows={[
            ['VARIANT', 'Any semi-structured value.', '{"order_id":"O-100","total":42.50}', 'Raw API payloads, event bodies, flexible source records.'],
            ['OBJECT', 'Key-value object.', '{"city":"Austin","state":"TX"}', 'Nested records such as address, customer, metadata.'],
            ['ARRAY', 'Ordered list of values.', '[{"sku":"A1"},{"sku":"B2"}]', 'Line items, tags, events, product attributes.'],
          ]}
        />
        <CodeBox label="Create a raw JSON landing table">{`CREATE OR REPLACE TABLE RAW.ORDER_EVENTS (
  payload VARIANT,
  source_file STRING,
  loaded_at TIMESTAMP_NTZ DEFAULT CURRENT_TIMESTAMP()
);

INSERT INTO RAW.ORDER_EVENTS (payload, source_file)
SELECT
  PARSE_JSON('{
    "event_id": "evt_1001",
    "event_type": "order_created",
    "order": {
      "order_id": "O-1001",
      "customer_id": "C-42",
      "total_usd": 149.99
    },
    "line_items": [
      {"sku": "SKU-1", "quantity": 2, "price_usd": 49.99},
      {"sku": "SKU-2", "quantity": 1, "price_usd": 50.01}
    ]
  }'),
  'manual_insert.json';`}
        </CodeBox>
        <Callout title="Raw does not mean trusted">
          Landing JSON in a VARIANT column preserves the source payload, but it does not prove the payload is
          valid for analytics. You still need typing, validation, deduplication, and modeling.
        </Callout>
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 03 — Path notation" />
        <SectionTitle>Reading Fields From JSON</SectionTitle>
        <Para>
          Snowflake lets you read nested fields using path notation. The colon moves from a VARIANT value
          into a key. Dot-style or bracket-style navigation moves deeper. After extracting a value, cast it
          into a normal SQL type so joins, filters, dashboards, and tests behave predictably.
        </Para>
        <CodeBox label="Extract fields with path notation">{`SELECT
  payload:event_id::STRING AS event_id,
  payload:event_type::STRING AS event_type,
  payload:order:order_id::STRING AS order_id,
  payload:order:customer_id::STRING AS customer_id,
  payload:order:total_usd::NUMBER(12,2) AS total_usd,
  loaded_at
FROM RAW.ORDER_EVENTS;`}
        </CodeBox>
        <Table
          headers={['Expression', 'Meaning', 'Result type before cast', 'Production note']}
          rows={[
            ['payload:event_id', 'Read top-level event_id.', 'VARIANT', 'Cast to STRING for stable use.'],
            ['payload:order:total_usd', 'Read nested order total.', 'VARIANT', 'Cast to NUMBER for sums and comparisons.'],
            ['payload:line_items[0]:sku', 'Read first item sku.', 'VARIANT', 'Good for inspection, not for modeling all items.'],
            ['payload:missing_key', 'Read absent key.', 'NULL-like value', 'Missing fields should be profiled and tested.'],
          ]}
        />
        <HighlightBox>
          <Para>
            <strong>Important habit:</strong> do not leave important business columns as uncast VARIANT in
            curated models. A value that looks like a number inside JSON should become NUMBER. A timestamp
            should become TIMESTAMP_NTZ, TIMESTAMP_LTZ, or TIMESTAMP_TZ based on the business requirement.
          </Para>
        </HighlightBox>
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 04 — Casting safely" />
        <SectionTitle>Use TRY_TO_* Functions When Source Data Can Be Dirty</SectionTitle>
        <Para>
          Source JSON often contains surprises: empty strings where a number should be, timestamps in a new
          format, nulls inside required fields, or a nested object where a string used to be. Normal casts
          are useful when you want the query to fail loudly. TRY_TO_* functions are useful when you want bad
          values to become NULL so you can capture them in quality checks.
        </Para>
        <CodeBox label="Safe casting pattern">{`CREATE OR REPLACE TABLE SILVER.ORDER_EVENTS AS
SELECT
  payload:event_id::STRING AS event_id,
  payload:event_type::STRING AS event_type,
  payload:order:order_id::STRING AS order_id,
  payload:order:customer_id::STRING AS customer_id,
  TRY_TO_NUMBER(payload:order:total_usd::STRING, 12, 2) AS total_usd,
  TRY_TO_TIMESTAMP_NTZ(payload:occurred_at::STRING) AS occurred_at,
  payload AS raw_payload,
  source_file,
  loaded_at
FROM RAW.ORDER_EVENTS;`}
        </CodeBox>
        <Table
          headers={['Function', 'Use it for', 'Why it helps']}
          rows={[
            ['TRY_TO_NUMBER', 'Dirty numeric strings.', 'Bad values become NULL instead of failing the whole transformation.'],
            ['TRY_TO_TIMESTAMP_NTZ', 'Timestamp text without timezone semantics.', 'Keeps invalid timestamps visible through null checks.'],
            ['TRY_TO_DATE', 'Date strings.', 'Useful for partition/date dimensions from messy sources.'],
            ['IS_NULL_VALUE', 'JSON null detection.', 'Distinguishes JSON null from some SQL null situations during profiling.'],
          ]}
        />
        <Callout title="Do not hide bad data forever" color="#ef4444">
          TRY_TO_* is not permission to ignore bad input. It lets the pipeline continue while you count,
          alert, and quarantine invalid records. If bad values become NULL silently, dashboards can lie.
        </Callout>
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 05 — FLATTEN" />
        <SectionTitle>LATERAL FLATTEN Turns Arrays Into Rows</SectionTitle>
        <Para>
          JSON arrays are common. An order has line items. A user has multiple devices. A product has many
          attributes. A single event may include multiple experiments. Analytics usually needs those children
          as rows, not trapped inside one nested array. Snowflake's FLATTEN table function expands arrays
          and objects.
        </Para>
        <CodeBox label="Flatten order line items">{`SELECT
  payload:order:order_id::STRING AS order_id,
  item.index AS line_item_index,
  item.value:sku::STRING AS sku,
  item.value:quantity::NUMBER AS quantity,
  item.value:price_usd::NUMBER(12,2) AS price_usd,
  item.value:quantity::NUMBER * item.value:price_usd::NUMBER(12,2) AS line_total_usd
FROM RAW.ORDER_EVENTS,
LATERAL FLATTEN(input => payload:line_items) item;`}
        </CodeBox>
        <Table
          headers={['FLATTEN output', 'Meaning', 'Why useful']}
          rows={[
            ['VALUE', 'The array element or object value.', 'Where most nested fields are extracted from.'],
            ['INDEX', 'Array element position.', 'Keeps original order when it matters.'],
            ['KEY', 'Object key when flattening objects.', 'Useful for dynamic attribute maps.'],
            ['PATH', 'Location in the nested document.', 'Useful for debugging complex JSON.'],
            ['THIS', 'Current element being flattened.', 'Helpful for recursive or deeper inspection.'],
          ]}
        />
        <Callout title="Preserve the parent key">
          When flattening child records, always carry the parent identifier such as order_id, event_id,
          customer_id, or session_id. Without it, the child rows lose their meaning.
        </Callout>
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 06 — Modeling pattern" />
        <SectionTitle>Raw JSON Should Become Typed Silver Tables</SectionTitle>
        <Para>
          A common production pattern is to keep raw JSON for replay and debugging, then publish typed Silver
          tables for regular use. Analysts should not need to remember JSON paths for every dashboard.
          BI tools should not repeatedly parse nested payloads if a curated table can expose reliable columns.
        </Para>
        <CodeBox label="Raw to Silver parent and child tables">{`CREATE OR REPLACE TABLE SILVER.ORDERS AS
SELECT
  payload:order:order_id::STRING AS order_id,
  payload:order:customer_id::STRING AS customer_id,
  payload:event_id::STRING AS source_event_id,
  TRY_TO_NUMBER(payload:order:total_usd::STRING, 12, 2) AS total_usd,
  TRY_TO_TIMESTAMP_NTZ(payload:occurred_at::STRING) AS order_ts,
  source_file,
  loaded_at
FROM RAW.ORDER_EVENTS
WHERE payload:event_type::STRING = 'order_created'
QUALIFY ROW_NUMBER() OVER (
  PARTITION BY payload:order:order_id::STRING
  ORDER BY loaded_at DESC
) = 1;

CREATE OR REPLACE TABLE SILVER.ORDER_ITEMS AS
SELECT
  payload:order:order_id::STRING AS order_id,
  item.index AS line_number,
  item.value:sku::STRING AS sku,
  item.value:quantity::NUMBER AS quantity,
  item.value:price_usd::NUMBER(12,2) AS price_usd,
  loaded_at
FROM RAW.ORDER_EVENTS,
LATERAL FLATTEN(input => payload:line_items) item
WHERE payload:event_type::STRING = 'order_created';`}
        </CodeBox>
        <Table
          headers={['Layer', 'What it stores', 'Who should use it']}
          rows={[
            ['RAW.ORDER_EVENTS', 'Full source JSON payload plus metadata.', 'Engineers debugging loads and replaying data.'],
            ['SILVER.ORDERS', 'One row per order with typed columns.', 'Analytics engineers, data quality checks, downstream marts.'],
            ['SILVER.ORDER_ITEMS', 'One row per order line item.', 'Revenue, product, inventory, and fulfillment models.'],
            ['GOLD.ORDER_REVENUE', 'Business-ready metrics.', 'Analysts, BI dashboards, finance stakeholders.'],
          ]}
        />
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 07 — Schema drift" />
        <SectionTitle>Schema Drift Is Normal, So Detect It Early</SectionTitle>
        <Para>
          Schema drift means the incoming payload shape changes over time. A new key appears. A key
          disappears. A field changes from number to string. An array becomes an object. In a source system,
          that may be a small release. In your warehouse, it can break dashboards or quietly turn metrics
          into NULL.
        </Para>
        <CodeBox label="Profile keys and null rates">{`-- Which top-level keys exist?
SELECT DISTINCT key
FROM RAW.ORDER_EVENTS,
LATERAL FLATTEN(input => OBJECT_KEYS(payload)) keys;

-- Are important extracted fields going null?
SELECT
  COUNT(*) AS rows_checked,
  COUNT_IF(payload:order:order_id IS NULL) AS missing_order_id,
  COUNT_IF(TRY_TO_NUMBER(payload:order:total_usd::STRING, 12, 2) IS NULL) AS invalid_total,
  COUNT_IF(payload:line_items IS NULL) AS missing_line_items
FROM RAW.ORDER_EVENTS
WHERE loaded_at >= DATEADD(day, -1, CURRENT_TIMESTAMP());`}
        </CodeBox>
        <Table
          headers={['Drift type', 'Example', 'Impact', 'Response']}
          rows={[
            ['New optional field', 'coupon_code appears.', 'Usually safe; may unlock new analysis.', 'Add to Silver when business wants it.'],
            ['Missing required field', 'order_id disappears.', 'Cannot identify records reliably.', 'Quarantine or fail quality check.'],
            ['Type change', 'total_usd becomes "149.99 USD".', 'Casts fail or become NULL.', 'Alert source owner and update parsing only if contract changes.'],
            ['Shape change', 'line_items array becomes object.', 'FLATTEN logic breaks.', 'Version payload handling or request source fix.'],
          ]}
        />
        <Callout title="Contracts beat surprises">
          For important feeds, write a source contract: required fields, optional fields, types, example
          payloads, owner, expected freshness, and change process. VARIANT makes ingestion flexible, but it
          does not replace communication.
        </Callout>
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 08 — Performance" />
        <SectionTitle>Semi-Structured Queries Can Be Expensive If You Use Them Carelessly</SectionTitle>
        <Para>
          Snowflake is good at semi-structured data, but that does not mean every dashboard should scan and
          parse giant JSON payloads all day. Repeatedly extracting the same fields from raw payloads can
          waste compute. Wide SELECT * queries over raw event tables can scan far more data than the user
          needs.
        </Para>
        <BulletList
          items={[
            'Extract frequently used fields into typed columns in Silver tables.',
            'Avoid SELECT * from raw JSON-heavy tables in BI dashboards.',
            'Filter on typed date/timestamp columns when possible.',
            'Keep raw payloads for replay, but do not make every consumer parse them.',
            'Use Query Profile to inspect bytes scanned and expensive expressions.',
          ]}
        />
        <CodeBox label="Better dashboard input">{`-- Weaker dashboard pattern:
SELECT
  payload:order:customer_id::STRING,
  payload:order:total_usd::NUMBER(12,2)
FROM RAW.ORDER_EVENTS
WHERE payload:event_type::STRING = 'order_created';

-- Better dashboard pattern:
SELECT customer_id, total_usd
FROM SILVER.ORDERS
WHERE order_ts >= '2026-09-01'
  AND order_ts <  '2026-10-01';`}
        </CodeBox>
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 09 — Loading JSON files" />
        <SectionTitle>Loading JSON Files Into VARIANT</SectionTitle>
        <Para>
          In production, JSON usually arrives in files or through a connector, not by hand-written
          PARSE_JSON inserts. Snowflake commonly loads JSON from an internal or external stage using a file
          format and COPY INTO. The safest raw-load pattern captures the payload plus metadata about where
          the record came from.
        </Para>
        <CodeBox label="Create JSON file format, stage, and raw table">{`CREATE OR REPLACE FILE FORMAT JSON_EVENTS_FORMAT
  TYPE = JSON
  STRIP_OUTER_ARRAY = TRUE
  IGNORE_UTF8_ERRORS = FALSE;

CREATE OR REPLACE STAGE ORDER_EVENTS_STAGE
  FILE_FORMAT = JSON_EVENTS_FORMAT;

CREATE OR REPLACE TABLE RAW.ORDER_EVENTS (
  payload VARIANT,
  source_file STRING,
  source_row_number NUMBER,
  loaded_at TIMESTAMP_NTZ DEFAULT CURRENT_TIMESTAMP()
);

COPY INTO RAW.ORDER_EVENTS (payload, source_file, source_row_number)
FROM (
  SELECT
    $1,
    METADATA$FILENAME,
    METADATA$FILE_ROW_NUMBER
  FROM @ORDER_EVENTS_STAGE
)
ON_ERROR = 'CONTINUE';`}
        </CodeBox>
        <Table
          headers={['Option or metadata', 'Meaning', 'Production use']}
          rows={[
            ['TYPE = JSON', 'Tells Snowflake files contain JSON.', 'Required for JSON file parsing.'],
            ['STRIP_OUTER_ARRAY', 'Loads array elements as separate rows when file is a JSON array.', 'Useful when one file contains [event1, event2, ...].'],
            ['METADATA$FILENAME', 'Name/path of loaded file.', 'Debug duplicates, bad files, and lineage.'],
            ['METADATA$FILE_ROW_NUMBER', 'Row number from staged file.', 'Locate bad records inside files.'],
            ['ON_ERROR', 'How COPY handles bad rows.', 'Choose deliberately; continuing without audit can hide failures.'],
          ]}
        />
        <Callout title="Raw load standard">
          Always keep enough metadata to answer: which file did this record come from, when did we load it,
          and how would we reload or quarantine it if the payload was wrong?
        </Callout>
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 10 — COPY validation and bad files" />
        <SectionTitle>Validate JSON Loads Before Trusting Them</SectionTitle>
        <Para>
          COPY INTO can load data, but loading is not the same as correctness. A file can load successfully
          while important fields are missing. A file can partially load if you allow row-level errors. A file
          can be loaded twice if you bypass Snowflake's normal load tracking or change file names. Validation
          turns a file arrival into a reliable pipeline step.
        </Para>
        <CodeBox label="Validation-oriented loading">{`-- Inspect whether files are loadable before the actual load.
COPY INTO RAW.ORDER_EVENTS (payload, source_file, source_row_number)
FROM (
  SELECT $1, METADATA$FILENAME, METADATA$FILE_ROW_NUMBER
  FROM @ORDER_EVENTS_STAGE
)
VALIDATION_MODE = RETURN_ERRORS;

-- After loading, check required fields.
SELECT
  source_file,
  COUNT(*) AS rows_loaded,
  COUNT_IF(payload:event_id IS NULL) AS missing_event_id,
  COUNT_IF(payload:order:order_id IS NULL) AS missing_order_id,
  COUNT_IF(payload:line_items IS NULL) AS missing_line_items
FROM RAW.ORDER_EVENTS
WHERE loaded_at >= DATEADD(hour, -1, CURRENT_TIMESTAMP())
GROUP BY source_file
ORDER BY source_file;`}
        </CodeBox>
        <Table
          headers={['Failure type', 'Example', 'Detection', 'Response']}
          rows={[
            ['Invalid JSON', 'Malformed braces or quotes.', 'COPY validation errors.', 'Reject file and notify producer.'],
            ['Missing required key', 'No order_id.', 'Post-load quality query.', 'Quarantine rows or fail downstream model.'],
            ['Unexpected type', 'total_usd is an object.', 'TRY_TO_NUMBER null rate spike.', 'Stop publishing Gold metrics until fixed.'],
            ['Duplicate file', 'Same payload delivered under new path.', 'Event id uniqueness checks.', 'Deduplicate by source event id or business key.'],
          ]}
        />
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 11 — Object maps and dynamic keys" />
        <SectionTitle>Handling Dynamic Object Keys</SectionTitle>
        <Para>
          Sometimes JSON contains an object where the keys themselves are meaningful. For example, a payload
          might include arbitrary feature flags, product attributes, experiment assignments, or partner-specific
          fields. These are not arrays, but you can still flatten the object to inspect keys and values.
        </Para>
        <CodeBox label="Flatten a dynamic attributes object">{`-- Example payload shape:
-- {
--   "product_id": "P-100",
--   "attributes": {
--     "color": "black",
--     "size": "M",
--     "material": "cotton"
--   }
-- }

SELECT
  payload:product_id::STRING AS product_id,
  attr.key::STRING AS attribute_name,
  attr.value::STRING AS attribute_value
FROM RAW.PRODUCT_EVENTS,
LATERAL FLATTEN(input => payload:attributes) attr;`}
        </CodeBox>
        <Table
          headers={['Modeling option', 'Shape', 'Good for', 'Tradeoff']}
          rows={[
            ['Wide columns', 'product_id, color, size, material.', 'Stable, frequently queried attributes.', 'Schema changes when attributes change.'],
            ['Key-value table', 'product_id, attribute_name, attribute_value.', 'Dynamic attributes and exploration.', 'Harder for BI and typed metrics.'],
            ['Keep VARIANT', 'payload attributes remain nested.', 'Raw replay and rare fields.', 'Repeated parsing and weaker contracts.'],
          ]}
        />
        <Callout title="Choose based on usage">
          If a field drives dashboards, joins, filters, or metrics, promote it to a typed column. If it is
          rare and exploratory, a key-value table or raw VARIANT may be enough.
        </Callout>
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 12 — Recursive flattening" />
        <SectionTitle>Recursive FLATTEN Helps Explore Unknown Nested Payloads</SectionTitle>
        <Para>
          When you receive a new payload and do not know its shape, recursive flattening can help you inspect
          nested keys. This is an exploration tool, not usually the final production model. It helps you map
          what exists before deciding which fields should become typed columns.
        </Para>
        <CodeBox label="Explore nested JSON paths">{`SELECT
  f.path,
  TYPEOF(f.value) AS value_type,
  COUNT(*) AS occurrences,
  MIN(f.value::STRING) AS example_value
FROM RAW.ORDER_EVENTS,
LATERAL FLATTEN(input => payload, recursive => TRUE) f
GROUP BY f.path, TYPEOF(f.value)
ORDER BY occurrences DESC, f.path;`}
        </CodeBox>
        <Table
          headers={['Use recursive flatten when', 'Avoid it when']}
          rows={[
            ['You are profiling a new API payload.', 'A dashboard needs predictable fast queries.'],
            ['You need to discover nested paths and types.', 'A typed Silver model already exists.'],
            ['You are investigating schema drift.', 'You need clean business metrics.'],
            ['You are writing documentation for source contracts.', 'You are processing huge payloads repeatedly without filters.'],
          ]}
        />
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 13 — Versioned payloads" />
        <SectionTitle>Version Your Event Payloads When the Meaning Changes</SectionTitle>
        <Para>
          JSON flexibility is helpful, but it can become dangerous when the same field name changes meaning.
          If total used to mean order total before discounts and later means after discounts, old and new
          records cannot be interpreted the same way. Payload versioning makes semantic changes explicit.
        </Para>
        <CodeBox label="Version-aware extraction">{`SELECT
  payload:event_id::STRING AS event_id,
  payload:schema_version::NUMBER AS schema_version,
  CASE payload:schema_version::NUMBER
    WHEN 1 THEN payload:order:total_before_discount::NUMBER(12,2)
    WHEN 2 THEN payload:order:subtotal_usd::NUMBER(12,2)
  END AS subtotal_usd,
  CASE payload:schema_version::NUMBER
    WHEN 1 THEN payload:order:discount_usd::NUMBER(12,2)
    WHEN 2 THEN payload:order:discount:amount_usd::NUMBER(12,2)
  END AS discount_usd
FROM RAW.ORDER_EVENTS;`}
        </CodeBox>
        <BulletList
          items={[
            'Add schema_version or event_version to important event payloads.',
            'Document what changed between versions.',
            'Keep extraction logic explicit instead of hoping one path works forever.',
            'Test old and new payload examples in CI or dbt tests.',
            'Deprecate old versions with dates and owner approval.',
          ]}
        />
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 14 — Deduplication with event ids" />
        <SectionTitle>Raw JSON Pipelines Need Duplicate Protection</SectionTitle>
        <Para>
          Event and API systems often send duplicates. A producer retries. A file is uploaded twice. A backfill
          overlaps with a daily feed. JSON flexibility does not solve this. You need stable event identifiers
          and deduplication rules before data reaches business metrics.
        </Para>
        <CodeBox label="Deduplicate event payloads">{`CREATE OR REPLACE TABLE SILVER.ORDER_EVENTS_DEDUPED AS
SELECT
  payload:event_id::STRING AS event_id,
  payload:event_type::STRING AS event_type,
  payload:order:order_id::STRING AS order_id,
  payload AS raw_payload,
  source_file,
  loaded_at
FROM RAW.ORDER_EVENTS
QUALIFY ROW_NUMBER() OVER (
  PARTITION BY payload:event_id::STRING
  ORDER BY loaded_at DESC, source_file DESC
) = 1;`}
        </CodeBox>
        <Table
          headers={['Key choice', 'Good when', 'Danger']}
          rows={[
            ['event_id', 'Each emitted event has a stable unique id.', 'Missing event_id makes dedupe unreliable.'],
            ['business key', 'Only latest state matters, such as one row per order.', 'May collapse legitimate multiple events.'],
            ['source file + row number', 'File lineage/debugging.', 'Does not dedupe same event in different files.'],
            ['hash of payload', 'No identifier exists and exact duplicate payloads occur.', 'Small payload changes create different hashes.'],
          ]}
        />
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 15 — Testing semi-structured models" />
        <SectionTitle>Quality Tests Make JSON Useful Instead of Just Flexible</SectionTitle>
        <Para>
          A semi-structured pipeline needs tests at multiple levels: can files load, do required keys exist,
          do casts succeed, do flattened children have parents, do duplicates stay controlled, and do
          sensitive fields stay out of broad Gold models?
        </Para>
        <CodeBox label="Quality gate queries">{`-- Required keys
SELECT COUNT(*) AS bad_rows
FROM RAW.ORDER_EVENTS
WHERE payload:event_id IS NULL
   OR payload:order:order_id IS NULL;

-- Invalid totals after casting
SELECT COUNT(*) AS invalid_totals
FROM RAW.ORDER_EVENTS
WHERE payload:order:total_usd IS NOT NULL
  AND TRY_TO_NUMBER(payload:order:total_usd::STRING, 12, 2) IS NULL;

-- Child rows without a parent order
SELECT i.order_id, COUNT(*) AS orphan_items
FROM SILVER.ORDER_ITEMS i
LEFT JOIN SILVER.ORDERS o
  ON i.order_id = o.order_id
WHERE o.order_id IS NULL
GROUP BY i.order_id;

-- Duplicate event ids
SELECT event_id, COUNT(*) AS duplicate_count
FROM SILVER.ORDER_EVENTS_DEDUPED
GROUP BY event_id
HAVING COUNT(*) > 1;`}
        </CodeBox>
        <Table
          headers={['Test', 'What it protects', 'Typical severity']}
          rows={[
            ['event_id not null', 'Lineage and dedupe.', 'High.'],
            ['order_id not null', 'Business key integrity.', 'High.'],
            ['valid total_usd', 'Revenue metrics.', 'High.'],
            ['line item parent exists', 'Join correctness.', 'Medium to high.'],
            ['no raw PII in Gold', 'Governance boundary.', 'High.'],
          ]}
        />
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 16 — Troubleshooting playbook" />
        <SectionTitle>When a JSON Pipeline Breaks, Debug in This Order</SectionTitle>
        <Para>
          Semi-structured failures can look mysterious because the payload is flexible. Make the debugging
          process boring and repeatable. Start at the file/load layer, then raw payload shape, then extraction
          logic, then modeled tables, then dashboards.
        </Para>
        <Table
          headers={['Step', 'Question', 'Snowflake check']}
          rows={[
            ['1', 'Did the file arrive?', 'List the stage or inspect external storage notification logs.'],
            ['2', 'Did COPY load it?', 'COPY_HISTORY, load audit table, source_file counts.'],
            ['3', 'Is the JSON valid?', 'VALIDATION_MODE = RETURN_ERRORS.'],
            ['4', 'Did required paths exist?', 'COUNT_IF(payload:path IS NULL).'],
            ['5', 'Did casts fail?', 'TRY_TO_* null-rate checks.'],
            ['6', 'Did FLATTEN multiply or lose rows?', 'Parent counts versus child counts.'],
            ['7', 'Did Gold metrics change?', 'Compare before/after aggregates and row counts.'],
          ]}
        />
        <CodeBox label="Incident notes template">{`Incident: daily product revenue dropped to zero

Check:
  - Were order event files delivered?
  - Did RAW.ORDER_EVENTS receive rows today?
  - Did payload:event_type still equal 'order_created'?
  - Did payload:line_items remain an array?
  - Did TRY_TO_NUMBER(price_usd) start returning NULL?
  - Did a new schema_version require different paths?

Resolution:
  - Quarantine bad files or update parser with version-aware logic.
  - Backfill Silver and Gold after fix.
  - Add a test that catches this exact failure next time.`}
        </CodeBox>
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 17 — Governance" />
        <SectionTitle>Raw JSON Can Hide Sensitive Data</SectionTitle>
        <Para>
          Semi-structured payloads often contain more than teams expect: emails, phone numbers, addresses,
          device identifiers, IP addresses, payment metadata, or free-text notes. A curated table may mask
          email, while the raw VARIANT payload still exposes the original value. Security reviews must include
          raw data, not only modeled columns.
        </Para>
        <Table
          headers={['Risk', 'Where it appears', 'Control']}
          rows={[
            ['PII hidden in raw payload.', 'payload:customer:email or metadata fields.', 'Limit Raw access; create masked curated views.'],
            ['Free-text sensitive data.', 'support_note, comment, custom_attributes.', 'Classify, tokenize, or exclude from broad marts.'],
            ['Unexpected partner fields.', 'New keys added without review.', 'Schema drift monitoring and access reviews.'],
            ['Over-broad analyst role.', 'SELECT on RAW event tables.', 'Prefer Gold/Silver views for most users.'],
          ]}
        />
        <Callout title="Security rule">
          If a sensitive value exists anywhere in the raw JSON, granting access to the raw table grants
          access to that value unless a separate control prevents it. Curated masking does not protect raw
          payloads automatically.
        </Callout>
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 18 — Mistakes" />
        <SectionTitle>Common Mistakes With JSON in Snowflake</SectionTitle>
        <Callout title="Avoid these" color="#ef4444">
          <BulletList
            items={[
              'Leaving all downstream analytics to parse raw JSON forever.',
              'Flattening arrays without preserving parent identifiers.',
              'Casting dirty values without checking null rates afterward.',
              'Using raw VARIANT tables directly in high-traffic dashboards.',
              'Assuming optional JSON keys are always present because a sample file had them.',
              'Exposing raw payloads to broad roles even though they contain PII.',
              'Treating schema drift as a rare edge case instead of normal source-system behavior.',
              'Not storing load metadata such as source file, loaded_at, batch id, or source system.',
            ]}
          />
        </Callout>
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 19 — Mini project" />
        <SectionTitle>Build a JSON Orders Model From Raw to Gold</SectionTitle>
        <Para>
          A strong hands-on exercise is to model order-created events. Start with one raw payload table.
          Build one parent order table, one child line-item table, and one Gold metric table. Add quality
          checks for required fields and invalid numbers.
        </Para>
        <CodeBox label="Project target model">{`Input:
  RAW.ORDER_EVENTS(payload VARIANT, source_file STRING, loaded_at TIMESTAMP_NTZ)

Silver outputs:
  SILVER.ORDERS
    order_id STRING
    customer_id STRING
    order_ts TIMESTAMP_NTZ
    total_usd NUMBER(12,2)
    source_event_id STRING

  SILVER.ORDER_ITEMS
    order_id STRING
    line_number NUMBER
    sku STRING
    quantity NUMBER
    price_usd NUMBER(12,2)

Gold output:
  GOLD.DAILY_PRODUCT_REVENUE
    order_date DATE
    sku STRING
    units_sold NUMBER
    revenue_usd NUMBER(12,2)

Quality checks:
  order_id is not null
  total_usd is not null and >= 0
  quantity is not null and > 0
  every order item has a parent order`}
        </CodeBox>
        <SubTitle>What this project teaches</SubTitle>
        <BulletList
          items={[
            'Why raw JSON and curated relational tables both matter.',
            'How VARIANT path notation becomes typed columns.',
            'How FLATTEN turns nested arrays into child tables.',
            'How schema drift and dirty values show up as quality failures.',
            'Why Gold tables should hide JSON complexity from business users.',
          ]}
        />
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 20 — Interview answer" />
        <SectionTitle>How to Explain Semi-Structured Data in a Snowflake Interview</SectionTitle>
        <Para>
          A strong answer sounds like this: Snowflake supports semi-structured data through VARIANT, OBJECT,
          and ARRAY. I would land raw JSON payloads into a VARIANT column with load metadata, inspect and
          profile the structure, extract stable fields using path notation, cast them into typed columns in
          Silver models, and use LATERAL FLATTEN for nested arrays such as line items. I would keep the raw
          payload for replay and debugging, but expose typed curated tables to analysts. In production, I
          would monitor schema drift, null rates, invalid casts, cost, and sensitive fields hidden in raw
          payloads.
        </Para>
        <SubTitle>Questions you should answer out loud</SubTitle>
        <BulletList
          items={[
            'What is VARIANT and when should you use it?',
            'How do you extract nested JSON fields in Snowflake?',
            'Why should important JSON values be cast into normal SQL types?',
            'How does LATERAL FLATTEN work?',
            'What is schema drift and how would you detect it?',
            'Why can raw JSON be a security risk?',
          ]}
        />
      </section>

      <KeyTakeaways
        items={[
          'VARIANT lets Snowflake store flexible JSON-like payloads.',
          'Path notation extracts nested fields, but curated models should cast values into stable SQL types.',
          'LATERAL FLATTEN expands arrays and objects into rows.',
          'Raw JSON is useful for replay and debugging; Silver and Gold tables should make analytics easier and safer.',
          'Schema drift, invalid casts, and hidden PII are production concerns, not edge cases.',
          'Semi-structured support is powerful when paired with modeling, quality checks, governance, and cost awareness.',
        ]}
      />
    </LearnLayout>
  )
}
