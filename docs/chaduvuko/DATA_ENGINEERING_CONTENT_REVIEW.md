# Data Engineering tutorial revision record

Review date: November 8, 2026 (America/Los_Angeles).

Follow-up: [actual content versus advertised statistics](DATA_ENGINEERING_STATISTICS_CONTENT_AUDIT.md) records a later inspection of all 47 live bodies and all 249 advertised topic entries. It identifies remaining coverage and implementation defects. The successful structural/example checks below must not be treated as universal factual or production-readiness approval.

## Scope and work delivered

All 47 existing Data Engineering modules have changes in their authored `content/data-engineering/*.tsx` files. The original routes and module order are preserved. Each module now includes a unique guided workshop with a specific learning objective, prerequisites, worked case, practice task, explained answer and supporting references.

The new workshops are authored in the individual lesson files. `DEWorkshop.tsx` supplies presentation only; it does not generate learning content from titles or tags. The earlier automatically generated Data Engineering context panel and its unused data generator have been removed.

The pass also corrects identified errors in the existing lesson bodies, including byte units, date parsing, SQL NULL uniqueness, atomicity versus idempotency, API cursor persistence, exact financial values, shell concurrency, retention advice, historical joins, quorum claims and rights-request guidance.

## Per-module revision ledger

The descriptions below identify concrete teaching additions and the issues examined. File length and the presence of keywords were not used as proof of completeness.

| Module | Source | Focus of revision |
| --- | --- | --- |
| 1 | [what-is-data](../../content/data-engineering/what-is-data.tsx) | Correct storage units, decimal representation, memory assumptions and date parsing; add byte/Unicode/money lab. |
| 2 | [what-is-data-engineering](../../content/data-engineering/what-is-data-engineering.tsx) | Add a stakeholder-to-data-product worked specification with acceptance tests, ownership and recovery. |
| 3 | [how-data-moves](../../content/data-engineering/how-data-moves.tsx) | Qualify universal medallion and infinite-retention advice; add boundary reconciliation and fan-out exercise. |
| 4 | [de-ecosystem](../../content/data-engineering/de-ecosystem.tsx) | Add requirement-driven tool evaluation, proof-of-concept boundaries and operating cost; qualify replacement narratives. |
| 5 | [de-vs-other-roles](../../content/data-engineering/de-vs-other-roles.tsx) | Add incident handoff and shared ownership; distinguish data modeling, analytical and ML responsibilities without rigid boundaries. |
| 6 | [de-usa-job-market](../../content/data-engineering/de-usa-job-market.tsx) | Flag unsupported salary statistics as illustrative; replace retired DP-203 advice; add reproducible job-market research lab. |
| 7 | [data-types-structured](../../content/data-engineering/data-types-structured.tsx) | Correct universal JSON/warehouse claims and add nested-array grain/validation exercise. |
| 8 | [data-formats](../../content/data-engineering/data-formats.tsx) | Add quoted CSV round-trip lab, distinguish logical records from lines, file/table formats and reader/writer schema evolution. |
| 9 | [databases-internals](../../content/data-engineering/databases-internals.tsx) | Add real query-plan comparison and explain selective access, index write cost and WAL/backup distinction. |
| 10 | [sql-vs-nosql](../../content/data-engineering/sql-vs-nosql.tsx) | Qualify schema-free and consistency generalizations; add workload-led database choice and denormalization repair exercise. |
| 11 | [warehouse-lake-lakehouse](../../content/data-engineering/warehouse-lake-lakehouse.tsx) | Add architecture sizing and transaction/catalog/engine separation; remove implied universal architecture. |
| 12 | [schemas-tables-keys](../../content/data-engineering/schemas-tables-keys.tsx) | Correct NULL uniqueness and deletion guidance; add tenant-aware composite-key lab with enforced relationship. |
| 13 | [acid-transactions](../../content/data-engineering/acid-transactions.tsx) | Correct atomicity versus idempotency, scope of isolation/durability, and add reproducible crash-and-retry transaction lab. |
| 14 | [python-for-de](../../content/data-engineering/python-for-de.tsx) | Add pure transformation with quarantine, exact money and deterministic unit tests; explain bounded memory and side effects. |
| 15 | [sql-for-de](../../content/data-engineering/sql-for-de.tsx) | Add deterministic deduplication lab with tie breaker and rejected-row semantics; distinguish event grain from entity state. |
| 16 | [linux-shell](../../content/data-engineering/linux-shell.tsx) | Add process/exit-code exercise, correct PID-file race and SIGKILL trap claims, warn CSV utilities need simple delimiter assumptions. |
| 17 | [git-for-data](../../content/data-engineering/git-for-data.tsx) | Add code-versus-data rollback exercise with manifests, replay/versioning and safe shared-branch workflow. |
| 18 | [working-with-apis](../../content/data-engineering/working-with-apis.tsx) | Correct unsafe pre-commit cursor saving, amount-unit guessing and Decimal-to-float conversion; add commit-boundary crash exercise. |
| 19 | [files-at-scale](../../content/data-engineering/files-at-scale.tsx) | Add file cardinality/partition sizing calculation and explain table-aware compaction, snapshot retention and engine-specific pruning. |
| 20 | [what-is-a-pipeline](../../content/data-engineering/what-is-a-pipeline.tsx) | Add explicit stage contracts, run outcomes and publication barrier; distinguish valid zero data from extraction failure. |
| 21 | [batch-vs-streaming](../../content/data-engineering/batch-vs-streaming.tsx) | Add event-time versus arrival-time lab, late-data correction and end-to-end latency budgeting; qualify streaming-only lateness claims. |
| 22 | [etl-vs-elt](../../content/data-engineering/etl-vs-elt.tsx) | Add field-level transform placement and dual-run migration tests; distinguish raw retention from ungoverned sensitive-data copying. |
| 23 | [ingestion-patterns](../../content/data-engineering/ingestion-patterns.tsx) | Add composite-watermark boundary demonstration, fixed upper bounds, overlap and delete detection limits. |
| 24 | [change-data-capture](../../content/data-engineering/change-data-capture.tsx) | Correct CDC before-image/erasure guarantees; add out-of-order CDC application simulation with sequence/tombstone handling. |
| 25 | [batch-pipeline-from-scratch](../../content/data-engineering/batch-pipeline-from-scratch.tsx) | Add complete dependency-free persisted pipeline lab with event audit, quarantine, transactional checkpoint and repeat-run verification. |
| 26 | [idempotency-atomicity](../../content/data-engineering/idempotency-atomicity.tsx) | Add stale-replay version guard and distinguish logical idempotency from changing operational metadata. |
| 27 | [error-handling-retries](../../content/data-engineering/error-handling-retries.tsx) | Add bounded retry budget calculation, ambiguous-outcome handling and critical-cohort DLQ acceptance tests. |
| 28 | [pipeline-orchestration](../../content/data-engineering/pipeline-orchestration.tsx) | Add interval-based scheduling and atomic publication DAG exercise; qualify logical date semantics and one-size backfill policies. |
| 29 | [data-lake-architecture](../../content/data-engineering/data-lake-architecture.tsx) | Add manifest-led publication, object consistency versus multi-object atomicity and governed lifecycle design. |
| 30 | [medallion-architecture](../../content/data-engineering/medallion-architecture.tsx) | Qualify Silver current-state-only rules; add separate event/entity contracts and rejected-record conservation. |
| 31 | [warehouse-concepts](../../content/data-engineering/warehouse-concepts.tsx) | Add projection/pruning calculation and controlled cache/queue/spill experiment instead of universal speed/cost promises. |
| 32 | [lakehouse-architecture](../../content/data-engineering/lakehouse-architecture.tsx) | Add optimistic-concurrency conflict demonstration and explicit engine-feature compatibility/maintenance checks. |
| 33 | [data-modelling](../../content/data-engineering/data-modelling.tsx) | Add order-line versus order grain and ratio aggregation exercise; avoid surrogate-key absolutes. |
| 34 | [slowly-changing-dimensions](../../content/data-engineering/slowly-changing-dimensions.tsx) | Add half-open interval point-in-time join, late correction and observed-time versus business-valid-time distinctions. |
| 35 | [data-vault](../../content/data-engineering/data-vault.tsx) | Add deterministic source-qualified key encoding and null/empty distinction; explain hashes are neither collision proof nor anonymization. |
| 36 | [data-quality](../../content/data-engineering/data-quality.tsx) | Add executable contract/conservation gates and cohort validation; connect quality results to publication. |
| 37 | [monitoring-observability](../../content/data-engineering/monitoring-observability.tsx) | Add measurable freshness/error-budget lab, missing-event detection and runbook evidence. |
| 38 | [data-governance](../../content/data-engineering/data-governance.tsx) | Correct erasure/sentinel and retention claims; add data-product contract, lineage impact and downstream activation/reverse-ETL controls. |
| 39 | [security-compliance](../../content/data-engineering/security-compliance.tsx) | Correct legal scope/deadlines, pseudonymization and crypto-erasure overclaims; add concrete permissions and deletion-verification lab. |
| 40 | [streaming-data](../../content/data-engineering/streaming-data.tsx) | Add explicit event-time window/state policy and replay retention; correct universal log and same-key ordering assumptions. |
| 41 | [message-brokers-queues](../../content/data-engineering/message-brokers-queues.tsx) | Add crash-safe consumer inbox/effect transaction demonstration, independent subscriptions and replay limits. |
| 42 | [distributed-systems](../../content/data-engineering/distributed-systems.tsx) | Correct quorum/consensus, skew corruption and impossible-global-order claims; add quorum overlap and consistency-boundary exercise. |
| 43 | [performance-tuning](../../content/data-engineering/performance-tuning.tsx) | Add critical-path/Amdahl analysis, correctness invariants and measured cost-per-result rather than unconditional speed promises. |
| 44 | [cicd-pipelines](../../content/data-engineering/cicd-pipelines.tsx) | Add expand/contract deployment and mixed-version contract exercise; distinguish rollback code from repair data. |
| 45 | [infrastructure-as-code](../../content/data-engineering/infrastructure-as-code.tsx) | Add backend version/locking migration and sensitive-state reasoning; correct prevent_destroy and access revocation absolutes. |
| 46 | [system-design-de](../../content/data-engineering/system-design-de.tsx) | Add integrated end-to-end capstone, capacity calculations, deliverables and acceptance/failure/recovery criteria. |
| 47 | [de-interview-questions](../../content/data-engineering/de-interview-questions.tsx) | Add evidence-based interview assessment, correction of memorized absolutes and graded design drill tied to capstone. |

## Reproducible verification

Run `npm run validate:de`.

The validator traverses the curriculum's 47 source files, requires exactly one authored workshop and an explained answer for every module, checks unique workshop titles and required authored fields, and executes the Python examples explicitly paired with expected output. The final pass executes 28 self-contained examples, including the complete local SQLite pipeline. A separate parser checks 229 embedded Python blocks without running remote service operations.

The embedded-code scan found six syntax problems: a Spark expression with comments after continuation backslashes, mixed Python/SQL, and function/class/DAG examples split across code blocks. These were repaired by correcting the expression, separating language execution, and keeping the complete Python constructs together.

The local pipeline also passes eight checks: normal ingestion, unchanged repeat execution, transaction rollback after an injected write failure, successful retry after rollback, a later corrected record, rejection of a boolean amount, an empty source, and persistence/replay after reopening the database.

Reading-time labels on 41 curriculum cards were aligned with their corresponding lesson pages. These are reading estimates, not claims about video length or the time needed to complete all practice.

The batch-pipeline workshop demonstrates extraction, validation, exact integer amounts, durable quarantine/audit, current-state merges, a checkpoint committed with output, and an idempotent second run. Its exercise specifies a rollback fault injection and a later corrected event.

The system-design workshop connects the track through a capstone with sizing assumptions, consumer contracts, batch/streaming outputs, data modeling, quality gates, release/recovery evidence and optional feature/vector-index extensions.

Final verification passed: the production build generated 661 pages; catalog validation accounted for 493 live lessons and checked 590 learning routes; SEO checked 635 pages and 629 sitemap URLs; lesson dates matched the current source. The existing quick-example suite passed with 309 examples executed. Twenty pre-existing examples retained their committed results because the installed Python/C toolchain differs from the recorded versions.

Rendered HTML checks confirmed one complete workshop on each of the 47 Data Engineering pages, valid destinations for all 41 internal links inside the workshops, and matching course-card/page reading-time labels.

The new Data Engineering checks do not execute provider provisioning, remote databases, paid cloud services or every pre-existing infrastructure snippet. The two existing loopback-network demonstrations in the wider suite were rerun with local socket access after the restricted sandbox initially denied bind operations.

## Primary references used for corrections

- Exact arithmetic: [Python decimal](https://docs.python.org/3/library/decimal.html).
- Date parsing options: [pandas to_datetime](https://pandas.pydata.org/docs/reference/api/pandas.to_datetime.html).
- Writer/container schemas: [Avro specification](https://avro.apache.org/docs/1.12.0/specification/).
- Historical snapshot metadata: [dbt snapshots](https://docs.getdbt.com/docs/build/snapshots).
- Constraint behavior: [PostgreSQL constraints](https://www.postgresql.org/docs/current/ddl-constraints.html).
- Statement and transaction snapshots: [PostgreSQL isolation](https://www.postgresql.org/docs/current/transaction-iso.html).
- TLS server authentication: [PostgreSQL SSL support](https://www.postgresql.org/docs/current/libpq-ssl.html).
- Object-operation consistency: [Amazon S3 consistency](https://docs.aws.amazon.com/AmazonS3/latest/userguide/Welcome.html#ConsistencyModel).
- Table commit boundaries: [Iceberg reliability](https://iceberg.apache.org/docs/latest/reliability/) and [Delta concurrency control](https://docs.delta.io/concurrency-control/).
- Source settings and snapshot/log coordination: [Debezium PostgreSQL connector](https://debezium.io/documentation/reference/stable/connectors/postgresql.html).
- Timetable-dependent data intervals: [Airflow DAG runs](https://airflow.apache.org/docs/apache-airflow/stable/core-concepts/dag-run.html).
- Infrastructure state/locking: [Terraform S3 backend](https://developer.hashicorp.com/terraform/language/backend/s3) and [sensitive state](https://developer.hashicorp.com/terraform/language/manage-sensitive-data).
- Credential retirement: [Azure Data Engineer](https://learn.microsoft.com/en-us/credentials/certifications/azure-data-engineer/) and [Fabric Data Engineer](https://learn.microsoft.com/en-us/credentials/certifications/fabric-data-engineer-associate/).
- Privacy concepts and response procedures: [GDPR](https://eur-lex.europa.eu/eli/reg/2016/679/oj/eng), [California Attorney General](https://oag.ca.gov/privacy/ccpa), [CPPA regulations](https://cppa.ca.gov/regulations/), and [HHS Security Rule summary](https://www.hhs.gov/hipaa/for-professionals/security/laws-regulations/index.html).

## Review limits

This record establishes that every module received a concrete editorial change and that the listed checks ran. It is not a claim that a build or word count proves every historical statement in a large tutorial corpus, or that remote cloud examples were exercised in production. Provider-specific setup and version-dependent behavior must be checked against the stated environment when those labs are run.

