# Data Engineering: actual content versus advertised statistics

Audit date: November 8, 2026. Repository baseline: `3aa85e567fe7a607cda246f4c1fd19055539d6d8`.

**Baseline finding (November 8, 2026):** the website delivered 47 substantial written lessons organized into six phases. At that snapshot, the 249 advertised topic entries included documented coverage gaps and technical defects. The displayed 49 hours was an unmeasured sum of reading estimates, not measured learner time. Public access to lesson material did not establish permanently free third-party compute or a future publishing policy.

This report examines the content behind the statistics. It is separate from the earlier [tutorial revision record](DATA_ENGINEERING_CONTENT_REVIEW.md), whose structural and example checks do not establish universal factual accuracy. The findings below preserve the November 8 baseline; the local remediation status is recorded here before the baseline evidence.

## Remediation follow-up — November 9, 2026

The [topic ledger](DATA_ENGINEERING_TOPIC_AUDIT.csv) has been reconciled against the updated lesson content: all 249 entries are currently classified as **Substantive**. The previously flagged career-market claims were replaced with a dated-posting research exercise; unsupported company and career scenarios are now labeled as fictional; missing lesson coverage was added for serving tools, SSH, pre-commit hooks, schema evolution, push/pull ingestion, CDC variants, anomaly detection, and GitOps; and the identified CDC, Snowflake, AutomateDV, lakehouse portability, retention, ordering, and CAP-theorem claims were corrected or qualified. The classification records instructional evidence, not proof of mastery or production readiness.

Validation completed locally:

- `npm run lint` passed with three existing warnings in `SkillTree.tsx`, `CommentSection.tsx`, and `SiteSearch.tsx`.
- `npm run build` passed, including catalog, SEO, lesson-date, quick-results, Data Engineering workshop, and code checks.
- `npm run validate:de` passed: 47/47 workshops, 28 executable Python examples, eight local-pipeline recovery checks, and 229 Python syntax blocks.

The measurement/hash snapshot remains the November 8 live-site baseline. The content changes have not been deployed, and no external Snowflake, Kafka, Airflow, or cloud integration was provisioned or exercised; verify production content after deployment.

## Evidence and method

1. Retrieved all 47 registered lesson URLs without an account or cookies. Every request returned HTTP 200 without a redirect and included the authored body and a guided workshop.
2. Extracted each rendered `.prose-chaduvuko` body, including expandable lesson answers. Excluded global navigation, shared quick-answer panels, progress controls and footers. Reviewed lesson sections, topic-specific explanatory passages, worked examples and practice against every advertised topic entry. Missing-term searches were checked against the complete extracted text, including text inside cards and tables, rather than only headings.
3. Recorded a manual evidence decision for all 249 entries in [the topic ledger](DATA_ENGINEERING_TOPIC_AUDIT.csv). A locator identifies an actual passage; the explanatory note records what it teaches and its limits. Finding a keyword did not automatically produce a passing decision.
4. Counted word-like Unicode units outside and inside `<pre>` separately. Code-side counts include outputs, architecture diagrams and transcripts. These counts measure volume, not teaching quality, independent concepts or learner completion.
5. Ran `npm run validate:de`: 28 self-contained Python examples executed with expected output; eight local-pipeline recovery/correctness cases passed; 229 Python blocks parsed successfully. Matched all 28 executed examples and their expected outputs to the live bodies. All 60 interview question/answer components were also present live.
6. Compared selected disputed implementation claims with primary documentation, cited under the findings below. No cloud provisioning, Snowflake deployment, complete dbt project, Kafka cluster or Airflow deployment was executed for this audit.

[Measurement snapshot](DATA_ENGINEERING_AUDIT_MEASUREMENTS.json) records per-lesson counts and SHA-256 hashes of the retrieved HTML and extracted body. HTML fingerprints identify the retrieved response, not a stable deployment identity; framework payloads can vary. Live content may change after this snapshot.

The review covers every lesson and every advertised topic entry. It is not an assertion that every sentence or every external-service example has received independent factual or runtime verification. “Substantive” below means instructional treatment was found, with no specific coverage defect recorded for that entry; it does not certify production readiness or complete mastery.

## 47 lessons and six phases: supported by actual material

The 47 pages are not empty placeholders. Their authored bodies contain approximately **280,462 prose word units** and **109,047 word units inside code/output/diagram blocks**. Individual lessons contain between 4,673 and 7,620 prose word units. Each has an authored guided workshop, objective, prerequisites, practice and explained answer. There are 1,322 rendered `<pre>` blocks; these must not be advertised as 1,322 runnable programs.

| Phase | Lessons with content | Prose word units | Advertised topic entries | Sum of stated reading estimates |
| --- | ---: | ---: | ---: | --- |
| 1 — What Even Is This? | 6 | 38,623 | 29 | 5h 05m |
| 2 — Data Fundamentals | 7 | 46,627 | 36 | 6h 20m |
| 3 — Core Engineering Skills | 6 | 34,948 | 34 | 7h 05m |
| 4 — How Data Moves | 9 | 49,298 | 46 | 10h |
| 5 — Storage & Architecture | 7 | 38,872 | 38 | 7h 05m |
| 6 — Quality, Governance & Production | 12 | 72,094 | 66 | 13h 30m |
| Total | 47 | 280,462 | 249 | 49h 05m |

The phase grouping exists. Its existence does not validate the stronger index promise of a self-contained course with no prerequisites: Lesson 14 explicitly assumes Python functions, dictionaries, exceptions and iterators, and Lesson 15 assumes SELECT, JOIN, GROUP BY and window foundations. Learners can follow other linked tracks, but those prerequisites are additional study beyond these 47 lessons. The index also says there are no cloud tools in this track while the actual bodies contain Snowflake, S3, Spark, Airflow and Terraform examples.

## Baseline topic evidence and exceptions — November 8, 2026

The registry contains exactly 249 advertised entries and 243 distinct case-normalized labels. Many labels also overlap semantically: for example, checkpointing, validation, database choices and delivery guarantees recur in different lessons. Neither number establishes a count of independent, fully taught concepts.

| Finding | Entries | Meaning |
| --- | ---: | --- |
| Substantive | 225 | Actual explanation, comparison or worked treatment found in the advertised lesson; no specific coverage gap recorded for that entry. |
| Correction | 7 | Treatment exists, but a documented technical/factual defect affects its explanation or implementation. Several entries refer to the same underlying defect. |
| Unverified | 6 | Real-world salary, hiring or company-implementation claims lack supporting evidence. |
| Partial | 5 | Mention or limited treatment exists, with an important part of the advertised topic missing. |
| Elsewhere | 4 | The substantive explanation is in another lesson, not the lesson advertising this entry. |
| Missing | 1 | Trigger-based CDC has no instructional treatment in its advertised lesson. |
| Undefined | 1 | “The future” has no defined outcome or identifiable lesson treatment. |
| Total | 249 | These are coverage decisions, not a percentage score of course completeness. |

The baseline coverage gaps were specific:

- **Lesson 4, serving tools:** the map teaches ingestion, storage, processing and orchestration, but does not teach BI/API serving tools. Lesson 3 explains consumers and serving instead.
- **Lesson 16, SSH:** remote copying with scp/rsync is demonstrated, but connection setup, authentication and host verification are assumed.
- **Lesson 17, pre-commit hooks:** secret scanners and baseline creation are mentioned, but no functioning hook configuration, installation or blocked-commit exercise is supplied. Compare the [project's setup instructions](https://pre-commit.com/#install).
- **Lesson 19, schema evolution:** one troubleshooting paragraph shows `mergeSchema`/ALTER. Compatibility rules and a worked migration are not taught there; other lessons cover more of the topic.
- **Lesson 22, push versus pull:** no explanation or worked comparison is present. Lesson 18's webhook/polling discussion supplies related mechanics.
- **Lesson 24, CDC variants:** log-based CDC is extensive; trigger-based CDC is missing. Query-based ingestion is mostly contrasted with CDC and is taught in Lesson 23.
- **Lesson 32, open/closed lakehouses and future:** catalogs and vendor coupling are discussed, but interchangeability and governance equivalence are overgeneralized. There is no defined future-facing topic or roadmap.
- **Lesson 37, anomaly detection:** only a passing threshold reference appears. The actual rolling-baseline and z-score examples are in Lesson 36.
- **Lesson 44, GitOps:** Git-driven CI/deployment is explained, but desired-state reconciliation, drift and a GitOps controller are not. See the [OpenGitOps principles](https://opengitops.dev/#principles).

These findings do not mean the concepts taught elsewhere are absent from the entire course. They mean the specific lesson promises and the 249-entry coverage claim cannot all be approved as presented.

## Technical and factual corrections required

### CDC: PostgreSQL DDL capture is described incorrectly

In [Lesson 24](https://chaduvuko.com/learn/data-engineering/change-data-capture), the schema-registry and evolution sections say the PostgreSQL connector reads DDL records from WAL and emits a separate schema-change event for every DDL operation. The connector documentation explicitly says PostgreSQL logical decoding does not support reporting DDL change events. Detecting refreshed relation/schema metadata during row streaming must be distinguished from delivering DDL statements/events. See [Debezium's PostgreSQL connector limitations and schema refresh behavior](https://debezium.io/documentation/reference/stable/connectors/postgresql.html).

The same lesson correctly defines BACKWARD in one table but reverses its meaning in an interview answer: BACKWARD protects a new reader's ability to consume older writer data. Old-reader/new-writer behavior is the forward direction. Examples should show both schemas and both reader/writer directions, including defaults and type-resolution rules. See [Confluent compatibility definitions](https://docs.confluent.io/platform/current/schema-registry/fundamentals/schema-evolution.html) and [Avro schema resolution](https://avro.apache.org/docs/1.12.0/specification/#schema-resolution).

Repair: separate connector-specific DDL behavior, teach trigger/query/log CDC with equivalent sample updates/deletes, and exercise schema changes against pinned connector/converter versions.

### Batch pipeline: Snowflake identifier handling is inconsistent

In [Lesson 25](https://chaduvuko.com/learn/data-engineering/batch-pipeline-from-scratch), `write_pandas` writes lowercase `orders_staging` and lowercase DataFrame columns with default identifier quoting. `MERGE_SQL` then references the table and columns without quotes. Snowflake resolves unquoted names to uppercase while quoted lowercase names retain their case. Under the default identifier settings, the resulting names do not match. This is a **static diagnosis from the published code and documented defaults**, not a reported execution of the cloud pipeline. See [write_pandas quoting defaults](https://docs.snowflake.com/en/developer-guide/python-connector/python-connector-api#write_pandas) and [Snowflake identifier resolution](https://docs.snowflake.com/en/sql-reference/identifiers-syntax).

The cloud example also lacks a complete install/version/bootstrap procedure. In contrast, the separate local SQLite workshop in the same lesson is executable and passed the eight recovery cases. Passing that local workshop does not validate the Snowflake implementation.

Repair: choose consistent quoted identifiers or safe uppercase/unquoted names, include dependencies/configuration/source fixtures, and run extraction-through-MERGE integration and crash/retry cases in a sandbox.

### Data Vault: the AutomateDV macro call is invalid

In [Lesson 35](https://chaduvuko.com/learn/data-engineering/data-vault), `automate_dv.hash('customer_id', 'MD5')` supplies `MD5` as the second positional argument and the sample appends another SQL alias. The actual macro's second argument is the output alias, not the algorithm; the macro already emits `AS alias`. Its algorithm is selected through configuration. This produces an incorrect/doubled alias expression. See the [maintainer's hash macro source](https://raw.githubusercontent.com/Datavault-UK/automate-dv/master/macros/supporting/hash.sql).

Repair: use named arguments and supported hash configuration, pin the package/adapter versions and compile/run the staging-to-hub/link/satellite example. The separate standard-library Python key-encoding lab ran successfully and does not exercise this dbt macro.

### Distributed systems: CAP attribution is wrong

[Lesson 42](https://chaduvuko.com/learn/data-engineering/distributed-systems) attributes the proof to Eric Brewer in 2000 in both the body and an interview answer. Brewer proposed the conjecture; Gilbert and Lynch supplied the formal proof published in 2002. The same lesson's later caveat about consistency/availability during partitions is more careful than its opening slogan. See [Gilbert and Lynch's paper](https://groups.csail.mit.edu/tds/papers/Gilbert/Brewer6.pdf).

Repair: correct the attribution consistently and use the failure-time, operation-specific guarantee throughout.

### Career data and named-company stories: provenance is missing

[Lesson 6](https://chaduvuko.com/learn/data-engineering/de-usa-job-market) explicitly labels its salary bands/multipliers as illustrative and says a supporting survey is not supplied. Nevertheless, its catalog description promises real salary data and the body claims current high-volume hiring and skill prevalence of 90%+ / 40–70% without a dated sample. [Lesson 2](https://chaduvuko.com/learn/data-engineering/what-is-data-engineering) repeats unsourced compensation multipliers. [Lesson 3](https://chaduvuko.com/learn/data-engineering/how-data-moves) presents a detailed Uber Eats implementation as an actual company example with no engineering citation.

The job-market research workshop is useful instruction. It is not itself a collected dataset validating the surrounding claims. Repair by publishing a dated, scoped employer-posting sample with provenance, or by consistently labeling the numbers and company architecture stories as hypothetical teaching examples.

### Editorial and version qualifications

Lesson 13's durability heading implies survival of every failure, Lesson 30's Bronze heading promises preservation forever, and Lesson 40's ordering heading declares global order impossible. Later passages are more qualified. Align the headings with the actual transaction, retention, and throughput/failure assumptions. Pin the Airflow/dbt/Spark/provider versions for tool-specific examples before promising a reproducible setup. The index's claim of no cloud tools should reflect the actual content.

## 49 hours: compare with the actual text

The lessons contain **zero embedded video players in their authored bodies**. There is no measured 49-hour video collection behind the display. Summing the manually supplied reading labels produces 2,945 minutes (49h 05m), which the index rounds to 49h.

An illustrative calculation from the extracted prose alone gives:

| Assumed prose reading rate | Time for 280,462 word units |
| --- | ---: |
| 175 words/minute | 26.7 hours |
| 200 words/minute | 23.4 hours |
| 250 words/minute | 18.7 hours |

These are arithmetic scenarios, not observed learner results. They exclude code interpretation, diagrams, setup, exercises, debugging, rereading and capstone implementation. General silent-reading measurements, such as [Brysbaert's 2019 research](https://biblio.ugent.be/publication/8647789), are not a validated rate for learning programming or building a pipeline.

The actual content is large enough that substantial study time is credible. **The audit cannot approve 49 hours as a measured duration or prove that 49 hours is sufficient.** It could be a reasonable planning estimate once reading/demo/practice assumptions are explicit. Time representative beginner/intermediate learners through each module, separate text reading from exercises/projects, and report a range before making a stronger completion-time claim.

## Free access: supported for the lessons

All 47 full lesson bodies and their workshops were retrieved without authentication or payment. The local standard-library examples can be followed without buying access to this site. Some other examples require third-party cloud/data services and environments; this audit did not establish a zero-cost execution path for every such example. “All lessons free” accurately describes the observed access. A future “forever” policy remains a publishing commitment rather than a content measurement.

## Release judgment

Keep the 47-lesson and six-phase counts. Treat the content as a substantial written Data Engineering track with known gaps. Do not represent the audit as approval of all 249 entries, a verified 49-hour completion duration, or a complete standalone production apprenticeship.

Before approving the stronger claims, repair the implementation/factual defects, fill or accurately relocate the topic promises, make prerequisites explicit, provide reproducible setup for the larger demos, and measure learner effort. The capstone is a substantial project brief with acceptance criteria; a completed reference deployment is not supplied or tested by the course-wide validators.

## Per-lesson review

“Flagged entries” counts the topic-ledger exceptions for that lesson, not every issue elsewhere in its prose. Zero flagged entries is not a universal accuracy certificate.

| Lesson | Live content | Prose word units | Advertised entries | Flagged entries | Content finding |
| --- | --- | ---: | ---: | ---: | --- |
| 01 | [what-is-data](https://chaduvuko.com/learn/data-engineering/what-is-data) | 7,205 | 4 | 0 | Bytes, encoding and file/database comparison; executable byte/money exercise. |
| 02 | [what-is-data-engineering](https://chaduvuko.com/learn/data-engineering/what-is-data-engineering) | 7,191 | 5 | 1 | Role/task/day walkthrough is substantive; salary/progression figures lack sources. |
| 03 | [how-data-moves](https://chaduvuko.com/learn/data-engineering/how-data-moves) | 6,622 | 5 | 1 | Complete source-to-consumer story; attribution of the Uber Eats implementation is unsupported. |
| 04 | [de-ecosystem](https://chaduvuko.com/learn/data-engineering/de-ecosystem) | 6,302 | 5 | 1 | Tool categories and choice exercise; serving tools are not taught here (see Lesson 3). |
| 05 | [de-vs-other-roles](https://chaduvuko.com/learn/data-engineering/de-vs-other-roles) | 6,629 | 5 | 0 | Role comparisons, shared responsibilities and recommendation-feature handoff exercise. |
| 06 | [de-usa-job-market](https://chaduvuko.com/learn/data-engineering/de-usa-job-market) | 4,674 | 5 | 4 | Career research method exists; current salary/hiring/prevalence claims are not verified data. |
| 07 | [data-types-structured](https://chaduvuko.com/learn/data-engineering/data-types-structured) | 6,903 | 4 | 0 | Three data categories and a runnable nested-array/grain exercise. |
| 08 | [data-formats](https://chaduvuko.com/learn/data-engineering/data-formats) | 6,480 | 6 | 0 | Five formats, layout/schema trade-offs and executable quoted/multiline CSV exercise. |
| 09 | [databases-internals](https://chaduvuko.com/learn/data-engineering/databases-internals) | 7,013 | 5 | 0 | Storage, indexes, buffer pool, log, plans and executable index experiment. |
| 10 | [sql-vs-nosql](https://chaduvuko.com/learn/data-engineering/sql-vs-nosql) | 6,455 | 5 | 0 | Relational/four NoSQL designs and workload-led selection exercise. |
| 11 | [warehouse-lake-lakehouse](https://chaduvuko.com/learn/data-engineering/warehouse-lake-lakehouse) | 6,960 | 5 | 0 | Warehouse/lake/lakehouse architecture and constrained-team choice exercise. |
| 12 | [schemas-tables-keys](https://chaduvuko.com/learn/data-engineering/schemas-tables-keys) | 6,454 | 5 | 0 | Schemas, keys, types, constraints and runnable composite-key integrity failure. |
| 13 | [acid-transactions](https://chaduvuko.com/learn/data-engineering/acid-transactions) | 6,362 | 6 | 0 | ACID, transaction control and runnable rollback; qualify the unlimited-durability heading. |
| 14 | [python-for-de](https://chaduvuko.com/learn/data-engineering/python-for-de) | 5,598 | 6 | 0 | Files, APIs, retries, logs, generators and tests; assumes Python foundations. |
| 15 | [sql-for-de](https://chaduvuko.com/learn/data-engineering/sql-for-de) | 5,108 | 6 | 0 | Windows, CTEs, duplicates, NULL, dates and dialects; assumes basic SQL. |
| 16 | [linux-shell](https://chaduvuko.com/learn/data-engineering/linux-shell) | 7,340 | 6 | 1 | Extensive terminal practice and exit-code lab; SSH connection/authentication tutorial is thin. |
| 17 | [git-for-data](https://chaduvuko.com/learn/data-engineering/git-for-data) | 5,367 | 5 | 1 | Git/LFS/review/recovery content; pre-commit is mentioned without a working hook setup. |
| 18 | [working-with-apis](https://chaduvuko.com/learn/data-engineering/working-with-apis) | 5,990 | 6 | 0 | Auth, pagination, quotas, webhooks and checkpoint/crash reasoning. |
| 19 | [files-at-scale](https://chaduvuko.com/learn/data-engineering/files-at-scale) | 5,545 | 5 | 1 | Partition, compression, compaction and sizing lab; schema evolution is only brief troubleshooting. |
| 20 | [what-is-a-pipeline](https://chaduvuko.com/learn/data-engineering/what-is-a-pipeline) | 6,117 | 5 | 0 | Stages, contracts, reliability, topology and flawed-pipeline redesign. |
| 21 | [batch-vs-streaming](https://chaduvuko.com/learn/data-engineering/batch-vs-streaming) | 5,701 | 5 | 0 | Three processing models, windows and event/arrival-time exercise. |
| 22 | [etl-vs-elt](https://chaduvuko.com/learn/data-engineering/etl-vs-elt) | 6,208 | 5 | 1 | ETL/ELT/hybrid migration coverage; advertised push/pull models are not explained here. |
| 23 | [ingestion-patterns](https://chaduvuko.com/learn/data-engineering/ingestion-patterns) | 4,837 | 5 | 0 | Full/incremental/CDC choice and a runnable shared-watermark boundary example. |
| 24 | [change-data-capture](https://chaduvuko.com/learn/data-engineering/change-data-capture) | 5,439 | 5 | 5 | Log-based CDC is detailed; trigger-based missing, query-based elsewhere, and DDL/compatibility errors remain. |
| 25 | [batch-pipeline-from-scratch](https://chaduvuko.com/learn/data-engineering/batch-pipeline-from-scratch) | 4,908 | 6 | 2 | Local pipeline passes eight recovery checks; the larger Snowflake example has a default identifier-case defect. |
| 26 | [idempotency-atomicity](https://chaduvuko.com/learn/data-engineering/idempotency-atomicity) | 5,160 | 5 | 0 | Idempotency/atomicity/restarts and a stale-version replay example. |
| 27 | [error-handling-retries](https://chaduvuko.com/learn/data-engineering/error-handling-retries) | 5,582 | 5 | 0 | Retries, circuits, DLQ, alerting and retry-budget exercise. |
| 28 | [pipeline-orchestration](https://chaduvuko.com/learn/data-engineering/pipeline-orchestration) | 5,346 | 5 | 0 | Scheduler architecture, DAGs, triggers and backfill practice; tool examples need explicit Airflow version targeting. |
| 29 | [data-lake-architecture](https://chaduvuko.com/learn/data-engineering/data-lake-architecture) | 5,971 | 6 | 0 | Storage/zones/governance and multi-file manifest publication exercise. |
| 30 | [medallion-architecture](https://chaduvuko.com/learn/data-engineering/medallion-architecture) | 5,775 | 5 | 0 | Layer contracts/current state/history; raw-forever heading conflicts with retention qualifications. |
| 31 | [warehouse-concepts](https://chaduvuko.com/learn/data-engineering/warehouse-concepts) | 5,389 | 5 | 0 | Columnar storage, encodings, warehouse profiles and scan-cost exercise. |
| 32 | [lakehouse-architecture](https://chaduvuko.com/learn/data-engineering/lakehouse-architecture) | 5,814 | 5 | 2 | Formats/commits/time travel/catalogs; open/closed comparison is limited and future label has no defined outcome. |
| 33 | [data-modelling](https://chaduvuko.com/learn/data-engineering/data-modelling) | 4,673 | 6 | 0 | Grain, facts/dimensions, star/snowflake, flags and executable join fan-out exercise. |
| 34 | [slowly-changing-dimensions](https://chaduvuko.com/learn/data-engineering/slowly-changing-dimensions) | 5,988 | 5 | 0 | Historical versions, SQL/dbt patterns and executable boundary-time join. |
| 35 | [data-vault](https://chaduvuko.com/learn/data-engineering/data-vault) | 5,262 | 6 | 1 | Vault structures and local key lab; AutomateDV macro example has invalid alias usage. |
| 36 | [data-quality](https://chaduvuko.com/learn/data-engineering/data-quality) | 5,107 | 6 | 0 | Six dimensions, rule/anomaly tests, contracts and runnable publication gate. |
| 37 | [monitoring-observability](https://chaduvuko.com/learn/data-engineering/monitoring-observability) | 5,092 | 5 | 1 | SLIs/SLOs/logs/alerts; anomaly-detection teaching is in Lesson 36, not this advertised lesson. |
| 38 | [data-governance](https://chaduvuko.com/learn/data-engineering/data-governance) | 5,787 | 5 | 0 | Catalog, lineage, classification, access and accountable product contract. |
| 39 | [security-compliance](https://chaduvuko.com/learn/data-engineering/security-compliance) | 5,255 | 5 | 0 | Encryption, PII, access and privacy basics; no general legal-compliance certification implied. |
| 40 | [streaming-data](https://chaduvuko.com/learn/data-engineering/streaming-data) | 7,620 | 5 | 0 | Events, offsets, groups, delivery, clocks and correction-policy exercise. |
| 41 | [message-brokers-queues](https://chaduvuko.com/learn/data-engineering/message-brokers-queues) | 6,409 | 5 | 0 | Queues/logs/replication/semantics and executable inbox/effect transaction. |
| 42 | [distributed-systems](https://chaduvuko.com/learn/data-engineering/distributed-systems) | 7,524 | 6 | 1 | Consistency/replication/sharding/faults/quorum; CAP proof attribution is wrong. |
| 43 | [performance-tuning](https://chaduvuko.com/learn/data-engineering/performance-tuning) | 5,818 | 6 | 0 | Profiling, joins, layouts, incremental work and measured optimization ceiling. |
| 44 | [cicd-pipelines](https://chaduvuko.com/learn/data-engineering/cicd-pipelines) | 5,468 | 5 | 1 | CI/staging/rollout/repair; formal GitOps reconciliation is not actually explained. |
| 45 | [infrastructure-as-code](https://chaduvuko.com/learn/data-engineering/infrastructure-as-code) | 5,137 | 6 | 0 | Resources/modules/state/CI; cloud provisioning examples were inspected, not applied. |
| 46 | [system-design-de](https://chaduvuko.com/learn/data-engineering/system-design-de) | 6,478 | 5 | 0 | Five system designs, sizing and a capstone brief; the complete capstone is a learner assignment, not a supplied tested deployment. |
| 47 | [de-interview-questions](https://chaduvuko.com/learn/data-engineering/de-interview-questions) | 6,399 | 7 | 0 | All 60 authored questions/answers are present live across seven categories. |

## Topic-by-topic evidence

Each locator is present in the fetched authored body unless the topic is marked Missing or Undefined. The CSV contains the same 249 decisions in a sortable format.

### 01. What is Data? How Computers Store Information

| Advertised topic | Finding | Content evidence and limit |
| --- | --- | --- |
| Bits & bytes | Substantive | Binary place values, byte ranges and storage-unit examples; Unicode/money workshop. Locate: Bits, Bytes and Scale. |
| Files vs databases | Substantive | Compares file scans, concurrent access, transactions and database constraints. Locate: Why Files Are Not Enough. |
| How memory works | Substantive | Contrasts volatile working memory, persistent storage and the latency hierarchy. Locate: RAM vs Disk. |
| Why data needs engineers | Substantive | Explains scale, velocity, variety and conflicting records through a startup task. Locate: The Scale Problem. |

### 02. What is Data Engineering?

| Advertised topic | Finding | Content evidence and limit |
| --- | --- | --- |
| The role defined | Substantive | Defines the role through reliable delivery of usable data. Locate: The One Sentence Definition. |
| Day-in-the-life | Substantive | Walks through incident checks, standup, pipeline work and stakeholder collaboration. Locate: A Day in the Life. |
| Why it exists | Substantive | Explains the source-to-consumer lifecycle and the engineering responsibilities it creates. Locate: The Data Engineering Lifecycle. |
| Career paths | Unverified | Describes progression, but presents unsourced salary bands and location/company multipliers. Locate: The Data Engineering Career Path. |
| What DEs actually build | Substantive | Gives pipeline, modeling, source integration, quality and tuning responsibilities. Locate: The Real Task List. |

### 03. How Data Moves Through a Company

| Advertised topic | Finding | Content evidence and limit |
| --- | --- | --- |
| Source systems | Substantive | Distinguishes operational databases, APIs, files, logs and event sources. Locate: Source Systems. |
| Data in motion | Substantive | Explains batch/streaming and full/incremental movement with a decision example. Locate: Ingestion — The First Engineering Problem. |
| Storage layers | Substantive | Traces landing, refined storage and warehouse layers with a flow diagram. Locate: Bronze, Silver, Gold. |
| Who uses the data | Substantive | Explains BI, analyst, data-science and application consumers. Locate: Who consumes data and how. |
| Real company example | Unverified | Uses a detailed Uber Eats story without an engineering source establishing that it is their actual implementation. Locate: Follow One Data Point. |

### 04. The Data Engineering Ecosystem — Map of All the Tools

| Advertised topic | Finding | Content evidence and limit |
| --- | --- | --- |
| Ingestion tools | Substantive | Compares managed connectors with custom code and their operating trade-offs. Locate: Ingestion Tools. |
| Storage tools | Substantive | Explains object stores, table formats and warehouses as different storage responsibilities. Locate: Object Storage. |
| Processing tools | Substantive | Compares Pandas, dbt, Spark and Flink by scale and workload. Locate: Processing Engines. |
| Orchestration tools | Substantive | Explains dependencies and shows a DAG. Locate: Orchestration and Scheduling. |
| Serving tools | Elsewhere | No BI/API serving-tool treatment; serving consumers are explained in Lesson 3 instead. Locate: Processing Engines. |

### 05. Data Engineer vs Analyst vs Scientist vs ML Engineer

| Advertised topic | Finding | Content evidence and limit |
| --- | --- | --- |
| DE vs DA | Substantive | Compares platform ownership with SQL analysis, reports and dashboards. Locate: Data Analyst. |
| DE vs DS | Substantive | Distinguishes data preparation/platform work from modeling and experimentation. Locate: Data Scientist. |
| DE vs MLE | Substantive | Explains model serving, production features and monitoring versus platform delivery. Locate: ML Engineer. |
| Who works with whom | Substantive | Shows dependencies, shared work and the recommendation-feature handoff exercise. Locate: All Four Roles. |
| Which role to target | Substantive | Uses preferred tasks and prerequisites to compare career directions. Locate: Which Role Should You Target. |

### 06. Data Engineering in the US Job Market (2026)

| Advertised topic | Finding | Content evidence and limit |
| --- | --- | --- |
| Salary by city | Unverified | Location examples exist, but the lesson expressly says no supporting market survey is supplied. Locate: City multipliers. |
| Company multipliers | Unverified | Company compensation examples are explicitly illustrative rather than observed market data. Locate: Company type multipliers. |
| Top hiring companies | Unverified | Names employers and claims current high-volume hiring without dated vacancy evidence. Locate: Top Companies Hiring. |
| Skills in JDs | Unverified | Gives skill tiers with 90%+ and 40–70% prevalence claims, but no sampled postings or denominator. Locate: Tier 1 — Non-negotiable. |
| Breaking in from non-CS | Substantive | Explains entry paths, portfolio evidence and a traceable job-posting research exercise. Locate: Breaking Into Data Engineering. |

### 07. Structured, Semi-Structured and Unstructured Data

| Advertised topic | Finding | Content evidence and limit |
| --- | --- | --- |
| Structured (tables) | Substantive | Explains fixed schemas, relational examples and validation requirements. Locate: Structured Data. |
| Semi-structured (JSON/XML) | Substantive | Works through nested JSON, arrays, flattening, XML and logs. Locate: Semi-Structured Data. |
| Unstructured (images/text) | Substantive | Explains metadata extraction and content processing for images, audio and documents. Locate: Unstructured Data. |
| Storage implications | Substantive | Compares storage choices and designs a mixed-data claims workflow. Locate: Storage Implications. |

### 08. Data Formats — CSV, JSON, Parquet, Avro, ORC

| Advertised topic | Finding | Content evidence and limit |
| --- | --- | --- |
| CSV internals | Substantive | Explains delimiters, quoting, record boundaries and a runnable multiline CSV round-trip. Locate: Comma-Separated Values. |
| JSON & nesting | Substantive | Explains nested JSON, JSON arrays versus NDJSON and key overhead. Locate: JavaScript Object Notation. |
| Parquet columnar | Substantive | Explains row groups, column chunks, projection, statistics and schema handling. Locate: Apache Parquet. |
| Avro & schema evolution | Substantive | Explains writer/reader schemas, file layout and schema evolution. Locate: Apache Avro. |
| ORC for Hive | Substantive | Compares ORC with Parquet and describes Hive-oriented use cases. Locate: Optimised Row Columnar. |
| When to use each | Substantive | Compares format trade-offs and applies them in a migration scenario. Locate: The Complete Decision Table. |

### 09. Databases — What They Are and How They Work Internally

| Advertised topic | Finding | Content evidence and limit |
| --- | --- | --- |
| Storage engines | Substantive | Compares B-tree/page organization with LSM write and compaction behavior. Locate: Storage Engines. |
| B-tree indexes | Substantive | Explains lookup paths, composite indexes and index types; includes a local plan experiment. Locate: Indexes — The Mechanism. |
| Buffer pool | Substantive | Explains cache hits, misses, eviction and scan pressure. Locate: The Buffer Pool. |
| WAL & durability | Substantive | Explains crash recovery, replication and CDC using log records. Locate: Write-Ahead Log. |
| How reads & writes work | Substantive | Traces parsing, planning, optimization and execution with EXPLAIN examples. Locate: How a SQL Query Becomes. |

### 10. SQL vs NoSQL — The Real Difference

| Advertised topic | Finding | Content evidence and limit |
| --- | --- | --- |
| Relational model | Substantive | Explains relations, joins, integrity and modeling trade-offs. Locate: Relational Databases. |
| Document stores | Substantive | Compares an embedded product document with relational tables and discusses limitations. Locate: Document Stores. |
| Key-value stores | Substantive | Shows Redis operations, expiration and appropriate access patterns. Locate: Key-Value Stores. |
| Column-family stores | Substantive | Explains query-led Cassandra schema design and constraints. Locate: Column-Family Stores. |
| When to use each | Substantive | Uses access pattern, consistency and scale questions plus a choice exercise. Locate: How to Choose the Right Database. |

### 11. Data Warehouse vs Data Lake vs Lakehouse

| Advertised topic | Finding | Content evidence and limit |
| --- | --- | --- |
| Warehouse design | Substantive | Explains analytical storage, schema-on-write and workload differences. Locate: Data Warehouse. |
| Data lake design | Substantive | Explains raw object storage, schema-on-read and governance problems. Locate: Data Lake. |
| Lakehouse evolution | Substantive | Explains the table-metadata layer and ACID over object storage. Locate: Lakehouse. |
| Cost vs flexibility | Substantive | Compares capability, operating complexity and cost assumptions. Locate: Warehouse vs Lake vs Lakehouse. |
| Choosing the right one | Substantive | Applies workload and team constraints to concrete architecture choices. Locate: How to Choose the Right Architecture. |

### 12. Schemas, Tables, Keys and Indexes — The Building Blocks

| Advertised topic | Finding | Content evidence and limit |
| --- | --- | --- |
| What a schema is | Substantive | Distinguishes database namespaces from table-structure contracts. Locate: What a Schema Is. |
| Primary & foreign keys | Substantive | Explains natural, surrogate, composite and foreign keys, including a runnable tenant-key failure. Locate: Keys — The Identifiers. |
| Indexes explained | Substantive | Explains index roles and query/write trade-offs in the schema discussion. Locate: Indexes. |
| Constraints | Substantive | Explains NOT NULL, UNIQUE, CHECK and relationship enforcement with failure cases. Locate: Constraints — The Rules. |
| Schema design patterns | Substantive | Explains audit columns, soft deletion, versioning and normalization. Locate: Schema Design Patterns. |

### 13. ACID Properties and Transactions

| Advertised topic | Finding | Content evidence and limit |
| --- | --- | --- |
| Atomicity | Substantive | Uses a bank transfer and a runnable rollback demonstration. Locate: Atomicity — All or Nothing. |
| Consistency | Substantive | Distinguishes database constraints from application business invariants. Locate: Consistency — Valid Before and After. |
| Isolation | Substantive | Explains concurrency anomalies, isolation levels and snapshot choices. Locate: Isolation — Transactions Do Not Interfere. |
| Durability | Substantive | Explains log flush and failure-model assumptions; absolute heading needs editorial qualification. Locate: Durability — Committed Data. |
| Transactions in practice | Substantive | Shows BEGIN/COMMIT/ROLLBACK, savepoints, Python transactions and autocommit. Locate: Writing and Managing Transactions. |
| What breaks without ACID | Substantive | Works through partial transfer and concurrency failures, then applies them to reconciliation. Locate: The Problem ACID Was Invented. |

### 14. Python for Data Engineering

| Advertised topic | Finding | Content evidence and limit |
| --- | --- | --- |
| File I/O at scale | Substantive | Compares eager loading, chunked reading, Parquet and cloud-file access. Locate: File I/O at Scale. |
| REST API calls | Substantive | Shows authenticated requests, pagination and rate-limit handling. Locate: Calling APIs From a Pipeline. |
| Error handling & retries | Substantive | Distinguishes transient/permanent failures and implements backoff and quarantine. Locate: Error Handling and Retries. |
| Logging patterns | Substantive | Provides a JSON formatter, levels and run identifiers. Locate: Structured Logging. |
| Generators | Substantive | Compares list and generator memory and chains lazy pipeline stages. Locate: Generators. |
| Writing testable code | Substantive | Separates pure logic from I/O; demonstrates unit tests, mocks and a runnable transform. Locate: Testable Code. |

### 15. SQL for Data Engineers — Beyond the Basics

| Advertised topic | Finding | Content evidence and limit |
| --- | --- | --- |
| Window functions | Substantive | Shows ranking, LAG/LEAD and explicit frames. Locate: Window Functions. |
| Complex CTEs | Substantive | Builds readable multi-stage transformations and a recursive query. Locate: Common Table Expressions. |
| Deduplication | Substantive | Compares exact duplicates and current-state selection; executable tie-breaker example. Locate: Deduplication. |
| Running totals | Substantive | Explains ordered window frames and cumulative aggregates. Locate: Running totals and moving averages. |
| Moving averages | Substantive | Shows moving-window aggregation alongside running totals. Locate: Running totals and moving averages. |
| Interview patterns | Substantive | Includes advanced SQL scenarios, dialect differences and explained answers. Locate: Interview Questions. |

### 16. Linux and Shell Scripting for Data Engineers

| Advertised topic | Finding | Content evidence and limit |
| --- | --- | --- |
| File system navigation | Substantive | Demonstrates pwd, navigation, discovery, file viewing and disk usage. Locate: Moving Around and Finding. |
| grep / awk / sed | Substantive | Shows filtering, extraction and replacement examples, with delimiter limitations. Locate: awk for Columns. |
| Bash scripting | Substantive | Builds a shell wrapper with control flow, functions, locks and exit-code practice. Locate: Variables, Conditionals, and Loops. |
| Cron jobs | Substantive | Explains schedule fields, crontab editing, paths and debugging. Locate: Cron — Automating. |
| Log processing | Substantive | Demonstrates context, regex, multiple files and composable pipelines. Locate: grep — Searching Logs. |
| SSH & remote access | Partial | Shows scp/rsync over SSH but assumes an existing session; no login/key/host-verification walkthrough. Locate: scp — simple and immediate. |

### 17. Git and Version Control for Data Projects

| Advertised topic | Finding | Content evidence and limit |
| --- | --- | --- |
| Branching strategies | Substantive | Explains GitHub Flow, trunk-based development and review/deploy stages. Locate: Branching Strategies. |
| git-lfs for data | Substantive | Shows install, tracking patterns, status and object-storage boundaries. Locate: Git LFS. |
| .gitignore patterns | Substantive | Explains secrets, raw/generated data and already-tracked-file limitations. Locate: .gitignore. |
| Pre-commit hooks | Partial | Mentions scanners and baseline creation but supplies no working hook configuration or trigger demonstration. Locate: pre-commit secret scanner. |
| PR workflows | Substantive | Provides a PR example, review checks and merge-conflict workflow. Locate: Pull Requests, Code Review. |

### 18. Working with APIs — REST, Auth, Pagination, Rate Limits

| Advertised topic | Finding | Content evidence and limit |
| --- | --- | --- |
| REST fundamentals | Substantive | Explains request/response anatomy, methods, status codes and protocol alternatives. Locate: HTTP and REST. |
| Pagination patterns | Substantive | Shows offset, cursor and next-URL pagination with their failure modes. Locate: Pagination — Three Styles. |
| OAuth 2.0 | Substantive | Explains token-based authorization and token renewal in ingestion. Locate: OAuth 2.0. |
| Rate limiting & backoff | Substantive | Explains quota headers, 429 handling, backoff and a token bucket. Locate: Rate Limiting. |
| Checkpointing | Substantive | Demonstrates crash boundaries; distinguishes durable state from safe bounded replay. Locate: Checkpoint after durable processing. |
| Webhooks | Substantive | Explains push notifications, signature validation, deduplication and reconciliation. Locate: Webhooks vs Polling. |

### 19. Working with Files at Scale

| Advertised topic | Finding | Content evidence and limit |
| --- | --- | --- |
| Hive-style partitioning | Substantive | Explains key=value paths, partition choice and pruning. Locate: Hive-style partitioning. |
| Compression tradeoffs | Substantive | Compares ratio, CPU, decompression and splitting behavior. Locate: Compression Codecs. |
| Small file problem | Substantive | Explains object/task overhead, compaction and prevention at write time. Locate: The Small File Problem. |
| File size optimisation | Substantive | Explains sizing, calibration and row-group trade-offs. Locate: Target File Sizes. |
| Schema evolution | Partial | Limited to a troubleshooting paragraph about mergeSchema and manual ALTER; broader evolution belongs to Lessons 8 and 24. Locate: schema evolution. |

### 20. What is a Data Pipeline? Anatomy and Design Principles

| Advertised topic | Finding | Content evidence and limit |
| --- | --- | --- |
| Pipeline anatomy | Substantive | Connects sources, extraction, transformation and loading. Locate: Each Layer of the Pipeline. |
| Stages explained | Substantive | Explains the responsibility and contract of each stage. Locate: Sources — where data comes from. |
| Design principles | Substantive | Explains reliability properties with concrete failure/recovery implications. Locate: The Eight Design Principles. |
| What makes a good pipeline | Substantive | Shows readable functions, configuration, contracts and observable outcomes. Locate: What Good Pipeline Code Looks Like. |
| Common anti-patterns | Substantive | Diagnoses an unsafe script and redesigns extraction, credentials and publication. Locate: Auditing a Fragile Pipeline. |

### 21. Batch vs Streaming vs Micro-Batch

| Advertised topic | Finding | Content evidence and limit |
| --- | --- | --- |
| Batch processing | Substantive | Explains bounded scheduled runs and works through a run timeline. Locate: Batch Processing. |
| Streaming processing | Substantive | Explains event-driven processing, windows, watermarks and consumer components. Locate: Streaming Processing. |
| Micro-batch | Substantive | Shows short bounded runs and Spark/plain-Python implementation patterns. Locate: Micro-Batch. |
| Latency vs throughput | Substantive | Compares latency, throughput, complexity and late-data behavior. Locate: Every Dimension. |
| Choosing the right model | Substantive | Applies explicit latency and operating constraints to three workloads. Locate: How to Choose the Right Processing Model. |

### 22. ETL vs ELT — History, Difference, When to Use Each

| Advertised topic | Finding | Content evidence and limit |
| --- | --- | --- |
| ETL explained | Substantive | Explains transformation before the destination and applies a flow example. Locate: ETL — Extract, Transform, Load. |
| ELT explained | Substantive | Explains landing first and transforming inside the destination with dbt. Locate: ELT — Extract, Load, Transform. |
| Why the shift happened | Substantive | Explains the historical compute/storage constraints behind the architectural change. Locate: Why ETL Dominated. |
| When ETL still wins | Substantive | Explains sensitive-data and unsupported-transformation boundaries. Locate: When ETL is genuinely the right choice. |
| Push vs pull models | Elsewhere | No push-versus-pull explanation in this lesson; webhook/polling mechanics appear in Lesson 18. Locate: The Modern Stack. |

### 23. Data Ingestion Patterns — Full Load, Incremental, CDC

| Advertised topic | Finding | Content evidence and limit |
| --- | --- | --- |
| Full load | Substantive | Shows replace-all variants and appropriate table sizes/use cases. Locate: Full Load. |
| Incremental load | Substantive | Shows bounded extraction, loading, checkpoint state and failure cases. Locate: Incremental — Only What Changed. |
| Watermark patterns | Substantive | Compares watermark choices; runnable shared-timestamp/key-boundary example. Locate: Watermark column selection. |
| CDC overview | Substantive | Explains source logs, event envelopes, initial snapshots and monitoring. Locate: Change Data Capture. |
| Choosing the right pattern | Substantive | Uses table size, change semantics, delete requirements and operational constraints. Locate: How to Choose the Right Pattern. |

### 24. Change Data Capture (CDC) — How It Works Under the Hood

| Advertised topic | Finding | Content evidence and limit |
| --- | --- | --- |
| Log-based CDC | Correction | Substantial logical-log/Debezium explanation, but PostgreSQL DDL-capture statements are incorrect. Locate: The Write-Ahead Log. |
| Trigger-based CDC | Missing | No trigger-based audit-table design, trigger example or trade-off treatment in the advertised lesson. |
| Query-based CDC | Elsewhere | Only incidental comparisons; timestamp query ingestion is taught in Lesson 23. Locate: query-based ingestion. |
| Transaction logs | Correction | Explains LSNs and logical decoding but incorrectly says the connector receives DDL records/events. Locate: The Write-Ahead Log. |
| Production gotchas | Correction | Backwards-compatibility direction is contradicted in an answer; DDL event/runbook assertions need correction. Locate: Schema Evolution. |

### 25. Building a Batch Pipeline From Scratch

| Advertised topic | Finding | Content evidence and limit |
| --- | --- | --- |
| Extract phase | Substantive | Explains source-clock bounds, server-side cursors and memory-safe extraction. Locate: Extraction — Chunked. |
| Validation patterns | Substantive | Implements row validation, rejection handling and a quality threshold. Locate: Validation — Catch Bad Data. |
| Transform logic | Substantive | Implements enrichment and destination projection with test examples. Locate: Transformation — Pure Functions. |
| Load strategies | Correction | Explains staging/MERGE, but lowercase quoted write_pandas objects conflict with unquoted SQL at default settings. Locate: Loading — Batch Upsert to Snowflake. |
| Checkpointing | Substantive | Explains atomic file replacement; the tested local pipeline commits progress with outputs. Locate: Checkpoint — Atomic. |
| Full working code | Correction | The local pipeline runs and passes recovery checks; the larger cloud pipeline has setup gaps and identifier mismatch. Locate: Run a complete local pipeline twice. |

### 26. Idempotency, Atomicity and Pipeline Restartability

| Advertised topic | Finding | Content evidence and limit |
| --- | --- | --- |
| What idempotency means | Substantive | Explains rerun invariants for records, intervals, files and external effects. Locate: Idempotency — Every Form. |
| Atomic operations | Substantive | Shows transactions, stage/promote and file-publication boundaries. Locate: Atomicity — No Partial States. |
| Making pipelines restartable | Substantive | Explains checkpoint granularity and idempotent replay. Locate: Restartability. |
| UPSERT patterns | Substantive | Shows keyed updates and demonstrates stale replay protection. Locate: upserts. |
| Overwrite vs append | Substantive | Contrasts append with replacement for a stable input interval. Locate: file-output idempotency. |

### 27. Error Handling, Retries and Dead Letter Queues

| Advertised topic | Finding | Content evidence and limit |
| --- | --- | --- |
| Error categories | Substantive | Classifies operational, input and code failures and the response to each. Locate: Transient vs Permanent Errors. |
| Retry policies | Substantive | Shows bounded attempts, Retry-After and circuit-breaker behavior. Locate: Retry Strategies. |
| Exponential backoff | Substantive | Explains synchronized retries and provides reusable backoff code. Locate: Exponential Backoff With Jitter. |
| Dead letter queues | Substantive | Defines quarantine records, monitoring and reprocessing. Locate: Dead Letter Queue. |
| Alerting patterns | Substantive | Defines severity, context, action and orchestration callbacks. Locate: Alerting — Signal. |

### 28. Pipeline Orchestration — What a Scheduler Does

| Advertised topic | Finding | Content evidence and limit |
| --- | --- | --- |
| What orchestration is | Substantive | Explains dependency coordination, retries, history and backfill. Locate: Orchestration Is Not Scheduling. |
| DAGs explained | Substantive | Builds task groups, transformations, quality gates and notification dependencies. Locate: DAG Design. |
| Dependencies & triggers | Substantive | Explains task relationships, time/dataset triggers and sensors. Locate: Dependencies. |
| Backfill concept | Substantive | Shows historical intervals, CLI examples and safe concurrency assumptions. Locate: Backfills. |
| Scheduler internals | Substantive | Explains scheduler, workers, executor, metadata DB and UI responsibilities. Locate: Airflow Architecture. |

### 29. Data Lake Architecture — Design, Zones and Anti-Patterns

| Advertised topic | Finding | Content evidence and limit |
| --- | --- | --- |
| Zone design | Substantive | Defines layer contracts, paths and access boundaries. Locate: Zones — How a Data Lake. |
| Raw zone | Substantive | Explains source preservation and approved replay/retention boundaries. Locate: Landing and Bronze. |
| Processed zone | Substantive | Explains typed trusted data versus consumer-specific products. Locate: Silver and Gold. |
| Landing zone | Substantive | Defines first arrival, temporary landing and promotion to managed raw storage. Locate: Landing and Bronze. |
| Anti-patterns | Substantive | Explains ownership, catalogs, security and retention failures. Locate: Governance — How Data Lakes. |
| Data swamp causes | Substantive | Connects missing metadata/ownership/quality controls to unusable stored files. Locate: The four governance pillars. |

### 30. Medallion Architecture — Bronze, Silver, Gold

| Advertised topic | Finding | Content evidence and limit |
| --- | --- | --- |
| Bronze layer | Substantive | Explains raw-event preservation, metadata, append behavior and replay. Locate: Bronze Layer. |
| Silver layer | Substantive | Explains typing, validation, deduplication, versioned upserts and current state. Locate: Silver Layer. |
| Gold layer | Substantive | Explains metrics, consumer contracts, aggregates and historical snapshots. Locate: Gold Layer. |
| What goes where | Substantive | Compares layer responsibilities; runnable event/current-state/grain exercise. Locate: Bronze vs Silver vs Gold. |
| Implementation decisions | Substantive | Explains materializations, late corrections and historical dimension choices. Locate: Where dbt Fits. |

### 31. Data Warehouse Concepts — Columnar Storage and Distribution

| Advertised topic | Finding | Content evidence and limit |
| --- | --- | --- |
| Columnar vs row storage | Substantive | Compares physical row and column layouts and projected reads. Locate: Columnar Storage. |
| Compression in warehouses | Substantive | Explains run-length, dictionary, delta and bit-packing encodings. Locate: Compression encoding per column type. |
| Distributed query | Substantive | Explains data distribution, network exchange and colocated joins. Locate: Snowflake vs BigQuery vs Redshift. |
| Partitioning | Substantive | Explains metadata pruning and reads versus total partitions. Locate: Micro-partitions. |
| Clustering | Substantive | Explains clustering choice, maintenance cost and measured profile evidence. Locate: Cluster keys. |

### 32. Lakehouse Architecture — Why It Exists and How It Works

| Advertised topic | Finding | Content evidence and limit |
| --- | --- | --- |
| Why lakehouse emerged | Substantive | Explains duplication, inconsistent copies and cross-system pipeline costs. Locate: Why Two Systems Were Worse. |
| Table formats | Substantive | Explains Delta/Iceberg metadata, snapshots and row-level change strategies. Locate: How Open Table Formats. |
| ACID on object storage | Substantive | Explains metadata commit coordination and demonstrates optimistic conflicts. Locate: Atomicity and consistency. |
| Open vs closed lakehouses | Partial | Discusses open catalogs and vendor coupling, but implies equivalent governance and interchangeable engines without a feature matrix. Locate: Apache Polaris. |
| The future | Undefined | No defined future-facing learning objective, roadmap or dedicated treatment for this advertised label. |

### 33. Data Modelling — Dimensional, Star and Snowflake Schema

| Advertised topic | Finding | Content evidence and limit |
| --- | --- | --- |
| Dimensional modelling | Substantive | Connects analytical questions, table grain and model design. Locate: Data Modelling. |
| Facts & dimensions | Substantive | Explains transaction/snapshot/factless tables and contextual dimensions. Locate: Fact Tables. |
| Star schema | Substantive | Shows a central fact table, dimensions and an analytical join. Locate: Star Schema. |
| Snowflake schema | Substantive | Explains normalized dimension hierarchies and their join trade-offs. Locate: STAR VS SNOWFLAKE SCHEMA. |
| Grain definition | Substantive | Compares order, order-line and periodic grain; runnable fan-out example. Locate: Grain — The Most Important Decision. |
| Junk dimensions | Substantive | Combines low-cardinality flags with an example dimension. Locate: Junk dimensions. |

### 34. Slowly Changing Dimensions — SCD Types 1, 2 and 3

| Advertised topic | Finding | Content evidence and limit |
| --- | --- | --- |
| SCD Type 1 | Substantive | Explains overwriting current attributes with no version history. Locate: SCD Type 1 — Overwrite. |
| SCD Type 2 | Substantive | Shows expiration/insertion, surrogate versions and point-in-time joins. Locate: SCD Type 2 — Full History. |
| SCD Type 3 | Substantive | Shows current/previous attributes and limited-history trade-offs. Locate: SCD Type 3. |
| When to use each | Substantive | Compares historical accuracy, current views and complexity. Locate: Choosing the Right SCD Type. |
| Implementation in SQL | Substantive | Shows SQL/dbt patterns and a runnable half-open boundary join. Locate: Point-in-time queries. |

### 35. Data Vault 2.0 — Hubs, Links and Satellites

| Advertised topic | Finding | Content evidence and limit |
| --- | --- | --- |
| Hubs | Substantive | Defines business-key existence, metadata and insert-only loading. Locate: Hub — records. |
| Links | Substantive | Models relationships and effectivity without overwriting the relationship key. Locate: Link — records. |
| Satellites | Substantive | Models descriptive versions, change detection and historical attributes. Locate: Satellite — descriptive. |
| Business keys | Correction | The local canonical-key example runs; the AutomateDV example passes MD5 as an alias and appends another AS alias. Locate: Implementing Data Vault in dbt. |
| When to use Data Vault | Substantive | Compares multi-source auditing needs with complexity for small teams. Locate: When Data Vault Is Overkill. |
| DV vs Dimensional | Substantive | Contrasts integration/history layers with analytics-ready marts. Locate: Choosing Between Data Vault. |

### 36. Data Quality — Dimensions, Testing and Validation

| Advertised topic | Finding | Content evidence and limit |
| --- | --- | --- |
| 6 quality dimensions | Substantive | Defines completeness, accuracy, consistency, timeliness, uniqueness and validity with checks. Locate: The six dimensions of data quality. |
| Completeness | Substantive | Explains expected-record coverage and required fields, plus reconciliation. Locate: Completeness. |
| Accuracy | Substantive | Distinguishes real-world truth from syntax/range validity and introduces cross-system reconciliation. Locate: Accuracy. |
| Freshness | Substantive | Provides time-based freshness thresholds and orchestration gates. Locate: dbt source freshness. |
| Uniqueness | Substantive | Connects primary-key/grain assumptions to duplicate checks and the runnable contract example. Locate: Uniqueness. |
| Validation patterns | Substantive | Combines schema, row, relationship, aggregate and publication checks. Locate: Data Contracts. |

### 37. Data Observability — Metrics, Logging and Anomaly Detection

| Advertised topic | Finding | Content evidence and limit |
| --- | --- | --- |
| Observability vs monitoring | Substantive | Distinguishes predefined health questions from investigating internal state. Locate: Monitoring vs Observability. |
| Pipeline metrics | Substantive | Explains counters, gauges, histograms and operational pipeline metrics. Locate: Metrics Collection. |
| Structured logging | Substantive | Builds structured fields and correlation IDs across a pipeline. Locate: Structured Logging. |
| Anomaly detection | Elsewhere | Only a passing anomaly-threshold reference; rolling-baseline and z-score examples are in Lesson 36. Locate: Alerting Tiers. |
| Alerting design | Substantive | Defines impact, response channels, runbooks and actionable context. Locate: Alerting Tiers. |

### 38. Data Governance — Catalogues, Lineage and Access Control

| Advertised topic | Finding | Content evidence and limit |
| --- | --- | --- |
| Data catalogues | Substantive | Explains discovery, metadata, ownership and a business glossary. Locate: Data Catalog. |
| Data lineage | Substantive | Traces sources, transformations and downstream dependencies. Locate: Data Lineage. |
| Column-level lineage | Substantive | Shows derived-column lineage and change-impact analysis. Locate: Table-level vs. column-level lineage. |
| Data classification | Substantive | Classifies direct and indirect identifiers and tags assets. Locate: PII classification taxonomy. |
| RBAC for data | Substantive | Shows roles, grants, masking, row policies and storage-level access. Locate: Access Control. |

### 39. Security and Compliance for Data Engineers

| Advertised topic | Finding | Content evidence and limit |
| --- | --- | --- |
| Encryption at rest & transit | Substantive | Explains transit protection, disk/object encryption and a column-encryption example. Locate: Encryption — At Rest and In Transit. |
| PII handling | Substantive | Defines identifiers, minimization, tagging and downstream handling. Locate: PII — Identifying and Handling. |
| GDPR basics | Substantive | Explains scope, rights, breach-response considerations and deletion boundaries. Locate: GDPR — What Data Engineers Need. |
| CCPA | Substantive | Explains California rights, opt-out concepts and differences from GDPR. Locate: California Consumer Privacy Act. |
| Compliance by design | Substantive | Provides inventory, access, retention, deletion, auditing and secrets checks. Locate: Compliance by Design. |

### 40. Streaming Data — What It Is and How It Works

| Advertised topic | Finding | Content evidence and limit |
| --- | --- | --- |
| Events & streams | Substantive | Defines event identity, time, payload and immutability. Locate: What an Event Actually Is. |
| Producers & consumers | Substantive | Explains writer/reader roles, topics and partitioning. Locate: Topics, Partitions, Producers, and Consumers. |
| Offsets & replay | Substantive | Explains positions, commits and retention-limited replay. Locate: Offsets — The Most Important Number. |
| Consumer groups | Substantive | Explains assignments, parallelism limits and rebalancing. Locate: Consumer Groups. |
| Event-driven architecture | Substantive | Compares notification, carried state and event sourcing. Locate: Three Event-Driven Architecture Patterns. |

### 41. Message Brokers and Queues — Internal Mechanics

| Advertised topic | Finding | Content evidence and limit |
| --- | --- | --- |
| What a message broker is | Substantive | Explains decoupling, buffering and broker responsibilities. Locate: What a Message Broker Actually Is. |
| Queues vs topics | Substantive | Compares competing consumers and independent subscriptions. Locate: Queues vs Topics. |
| Durability | Substantive | Explains leaders, followers, acknowledgements and availability trade-offs. Locate: Durability — How Replication. |
| Ordering guarantees | Substantive | Explains partition order, retry/in-flight behavior and global-order trade-offs. Locate: Ordering Guarantees. |
| At-least-once vs exactly-once | Substantive | Explains idempotent producers, transactions and consumer-side effects; runnable inbox example. Locate: Exactly-Once Internals. |

### 42. Distributed Systems for Data Engineers

| Advertised topic | Finding | Content evidence and limit |
| --- | --- | --- |
| CAP theorem | Correction | Substantial failure-time trade-off explanation, but wrongly credits the proof to Brewer in 2000. Locate: CAP Theorem. |
| Consistency models | Substantive | Distinguishes linearizability, serializability, read-your-writes and eventual consistency. Locate: Consistency Models. |
| Partitioning | Substantive | Explains hash/range partitioning, key selection and resharding. Locate: Partitioning and Sharding. |
| Replication | Substantive | Compares single/multi-leader and leaderless replication. Locate: Replication — Leader-Follower. |
| Fault tolerance | Substantive | Explains checkpointing, failure classes, recovery and replay. Locate: Fault Tolerance. |
| Distributed transactions | Substantive | Explains compensation across services and compares transaction boundaries. Locate: The Saga Pattern. |

### 43. Performance Tuning and Cost Optimisation

| Advertised topic | Finding | Content evidence and limit |
| --- | --- | --- |
| Bottleneck types | Substantive | Starts from measured CPU, I/O, network, shuffle and skew symptoms. Locate: Performance Tuning Is Diagnosis. |
| Profiling pipelines | Substantive | Uses stages, tasks, profiles and a critical-path calculation. Locate: Reading the Spark UI. |
| Storage optimisation | Substantive | Explains file layout, compaction and read reduction. Locate: Partitioning. |
| Query tuning | Substantive | Shows plans, pruning, projections and join/query alternatives. Locate: SQL Performance. |
| Cost models | Substantive | Connects scanned bytes, compute time and workload-specific measurements. Locate: Cost. |
| Right-sizing | Substantive | Explains compute sizing, memory pressure and partition/concurrency trade-offs. Locate: tune executor configuration. |

### 44. DataOps and CI/CD for Data Pipelines

| Advertised topic | Finding | Content evidence and limit |
| --- | --- | --- |
| DataOps principles | Substantive | Explains why pipeline releases change persistent datasets and consumer contracts. Locate: CI/CD for Data. |
| Testing pipelines in CI | Substantive | Distinguishes unit, integration and end-to-end checks and CI gates. Locate: Testing Strategies. |
| Staging environments | Substantive | Defines isolated dev, staging and production roles and representative data. Locate: Environment Strategy. |
| Rollback strategies | Substantive | Explains staged releases, compatibility migration, rollback and data repair. Locate: Safe Deployment Patterns. |
| GitOps for data | Partial | Covers Git-triggered CI/deployment; does not explain declarative reconciliation/drift or demonstrate a GitOps controller. Locate: Git Sync. |

### 45. Infrastructure as Code for Data Engineers

| Advertised topic | Finding | Content evidence and limit |
| --- | --- | --- |
| Why IaC matters | Substantive | Connects reproducibility, review, drift and environment reuse. Locate: Why It Matters for Data Platforms. |
| Terraform core concepts | Substantive | Explains providers, resources, variables, outputs, state, plan and apply. Locate: Terraform Fundamentals. |
| Provisioning data resources | Substantive | Shows bucket policies, encryption, lifecycle, roles and Snowflake resources. Locate: Provisioning an S3 Data Lake. |
| State management | Substantive | Explains sensitive state, locking, backend/version choices and reviewed plans. Locate: Review the state boundary. |
| Modules and reuse | Substantive | Defines a reusable data-lake module and environment-specific callers. Locate: Terraform Modules. |
| CI/CD for infrastructure | Substantive | Shows plan/review/apply stages and controlled concurrency. Locate: CI/CD for Terraform. |

### 46. Data Engineering System Design

| Advertised topic | Finding | Content evidence and limit |
| --- | --- | --- |
| Design framework | Substantive | Structures requirement discovery, sizing, architecture, guarantees and operations. Locate: The Seven-Step Framework. |
| Capacity estimation | Substantive | Works from event volume to rate, storage, throughput and compute assumptions. Locate: Capacity Estimation. |
| Trade-off analysis | Substantive | Explains batch/stream, consistency, costs, operations and flexibility choices. Locate: The Seven Trade-Offs. |
| Common system designs | Substantive | Works through five design prompts plus an integrated capstone specification. Locate: Design 1. |
| Interview approach | Substantive | Explains requirements-first reasoning, time allocation and follow-up trade-offs. Locate: What the Interviewer Is Actually Evaluating. |

### 47. Interview Prep — 60 Complete Answers

| Advertised topic | Finding | Content evidence and limit |
| --- | --- | --- |
| Python for DE | Substantive | Ten authored Python answers with implementation examples. Locate: Python — 10 Questions. |
| SQL advanced | Substantive | Ten authored SQL answers with worked queries and explanations. Locate: SQL — 10 Questions. |
| Pipeline design | Substantive | Ten authored pipeline answers covering semantics, recovery and migration. Locate: Pipeline Design — 10 Questions. |
| Data modelling | Substantive | Eight authored modeling/warehouse answers. Locate: Data Modelling and Warehousing. |
| Architecture | Substantive | Architecture answers plus Spark/Kafka scenarios; not a separate additional question count. Locate: System Design and Architecture. |
| System design | Substantive | Seven authored system-design/architecture answers. Locate: System Design and Architecture. |
| Behavioural | Substantive | Five authored answers with incident/ownership reasoning and a self-assessment rubric. Locate: Behavioural — 5 Questions. |
