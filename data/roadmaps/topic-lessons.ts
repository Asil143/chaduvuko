/**
 * Chaduvuko lessons that teach each roadmap topic, shown in the roadmap topic drawer.
 *
 * Keys are roadmap node ids, which repeat across roadmaps ("sql", "git"). A key of the form
 * "<roadmap slug>:<node id>" overrides the shared entry for one roadmap, for ids that mean
 * something different there. Topics without a matching lesson are left out; the drawer says
 * so instead of linking somewhere loosely related. Every href must be a live lesson
 * (checked by scripts/validate-catalog.ts).
 */
const L = '/learn'

export const TOPIC_LESSONS: Record<string, string[]> = {
  // Foundations
  linux: [`${L}/data-engineering/linux-shell`],
  git: [`${L}/data-engineering/git-for-data`],
  networking: [`${L}/networking/what-is-a-network`, `${L}/networking/tcp-ip-model`, `${L}/networking/dns`, `${L}/networking/http-and-https`],
  python: [`${L}/python/what-is-python-setup`, `${L}/python/functions`, `${L}/python/reading-writing-files`, `${L}/python/exception-handling`],
  syntax: [`${L}/python/what-is-python-setup`, `${L}/python/variables-data-types`, `${L}/python/control-flow`, `${L}/python/functions`],
  sql: [`${L}/sql/select-from`, `${L}/sql/joins-intro`, `${L}/sql/group-by`, `${L}/sql/subqueries`],
  sqladv: [`${L}/sql/window-functions-intro`, `${L}/sql/cte-with-clause`, `${L}/sql/recursive-cte`, `${L}/sql/explain-analyze`],
  scripting: [`${L}/data-engineering/linux-shell`, `${L}/python/building-a-cli-tool`],
  programming: [`${L}/python/what-is-python-setup`, `${L}/python/functions`],
  lang: [`${L}/python/what-is-python-setup`],
  apis: [`${L}/data-engineering/working-with-apis`, `${L}/python/working-with-apis-python`, `${L}/networking/http-and-https`],
  dsa: [`${L}/dsa/complexity`, `${L}/dsa/arrays`, `${L}/dsa/hashing`, `${L}/dsa/dynamic-programming`],
  ds: [`${L}/dsa/arrays`, `${L}/dsa/linked-lists`, `${L}/dsa/stacks`, `${L}/dsa/hashing`],
  oop: [`${L}/python/classes-objects`, `${L}/python/inheritance-polymorphism`, `${L}/python/abstract-base-classes`],
  async: [`${L}/python/async-python`, `${L}/python/multithreading-multiprocessing`],
  packaging: [`${L}/python/packaging-distribution`, `${L}/python/modules-packages-venv`],
  html: [`${L}/html-css/what-is-html-how-the-web-works`, `${L}/html-css/document-structure`, `${L}/html-css/text-semantic-structure`, `${L}/html-css/semantic-html-accessibility-basics`],
  css: [`${L}/html-css/what-is-css-syntax-selectors-cascade`, `${L}/html-css/flexbox-complete-guide`, `${L}/html-css/css-grid-complete-guide`, `${L}/html-css/responsive-design-media-queries`],
  styling: [`${L}/html-css/css-architecture-naming`, `${L}/html-css/intro-to-sass`, `${L}/html-css/css-custom-properties`],
  a11y: [`${L}/html-css/semantic-html-accessibility-basics`, `${L}/html-css/css-accessibility-best-practices`],
  webapis: [`${L}/html-css/html5-apis-overview`],

  // Data
  pandas: [`${L}/python/numpy-pandas-intro`, `${L}/ai-ml/programming/pandas-dataframes`, `${L}/ai-ml/programming/numpy-arrays`],
  numpy: [`${L}/ai-ml/programming/numpy-arrays`, `${L}/ai-ml/programming/pandas-dataframes`],
  adf: [`${L}/azure/adf`],
  p01: [`${L}/projects/azure-batch-pipeline`],
  p02: [`${L}/projects/azure-projects-02`],
  p03: [`${L}/projects/azure-project-03`],
  orchestration: [`${L}/data-engineering/pipeline-orchestration`, `${L}/gcp/composer`],
  dbt: [`${L}/dbt/what-is-dbt`, `${L}/dbt/models-basics`, `${L}/dbt/incremental-models`, `${L}/dbt/testing-basics`],
  datamodeling: [`${L}/data-engineering/data-modelling`, `${L}/data-engineering/slowly-changing-dimensions`, `${L}/data-engineering/data-vault`],
  data_modeling: [`${L}/data-engineering/data-modelling`, `${L}/data-engineering/slowly-changing-dimensions`],
  monitoring: [`${L}/data-engineering/monitoring-observability`],
  systemdesign: [`${L}/data-engineering/system-design-de`],
  warehouse: [`${L}/data-engineering/warehouse-concepts`, `${L}/gcp/bigquery`, `${L}/snowflake/what-is-snowflake`, `${L}/aws/redshift`],
  docs: [`${L}/dbt/documentation`, `${L}/data-engineering/data-governance`],
  kafka: [`${L}/apache-kafka/what-is-apache-kafka`, `${L}/apache-kafka/events-topics-partitions`, `${L}/apache-kafka/consumer-groups-offsets`, `${L}/apache-kafka/delivery-semantics`],
  queues: [`${L}/data-engineering/message-brokers-queues`, `${L}/apache-kafka/what-is-apache-kafka`],
  events: [`${L}/apache-kafka/event-driven-architecture`],
  data_arch: [`${L}/data-engineering/warehouse-lake-lakehouse`, `${L}/data-engineering/medallion-architecture`, `${L}/data-engineering/lakehouse-architecture`],
  internals: [`${L}/data-engineering/databases-internals`, `${L}/dbms/storage-file-organization`, `${L}/dbms/hashing-btrees`],
  indexing: [`${L}/sql/indexes`, `${L}/sql/index-strategies`, `${L}/dbms/indexes`, `${L}/dbms/query-processing`],
  backup: [`${L}/dbms/crash-recovery`],
  replication: [`${L}/dbms/distributed-databases`],
  perf_tuning: [`${L}/sql/explain-analyze`, `${L}/sql/query-best-practices`, `${L}/dbms/query-processing`],
  nosql: [`${L}/data-engineering/sql-vs-nosql`, `${L}/dbms/nosql-databases`],

  // Math, ML and AI
  math: [`${L}/ai-ml/math-foundations/vectors-matrices-tensors`, `${L}/ai-ml/math-foundations/derivatives-and-gradients`, `${L}/ai-ml/math-foundations/probability-distributions`],
  stats: [`${L}/ai-ml/math-foundations/probability-distributions`],
  prob: [`${L}/ai-ml/math-foundations/probability-distributions`],
  sklearn: [`${L}/ai-ml/programming/sklearn-interface`, `${L}/ai-ml/data-engineering/feature-engineering`],
  viz: [`${L}/ai-ml/programming/matplotlib-seaborn`],
  feature: [`${L}/ai-ml/data-engineering/feature-engineering`, `${L}/ai-ml/data-engineering/feature-scaling`, `${L}/ai-ml/data-engineering/encoding-categorical-features`],
  ml: [`${L}/ai-ml/classical-ml/what-is-ml`, `${L}/ai-ml/classical-ml/linear-regression`, `${L}/ai-ml/classical-ml/decision-trees`, `${L}/ai-ml/evaluation/evaluation-metrics`],
  dl: [`${L}/ai-ml/deep-learning/neural-networks-from-scratch`, `${L}/ai-ml/deep-learning/backpropagation`, `${L}/ai-ml/deep-learning/cnns-image-classification`],
  pytorch: [`${L}/ai-ml/deep-learning/neural-networks-from-scratch`, `${L}/ai-ml/deep-learning/optimisers`],
  transformers: [`${L}/ai-ml/deep-learning/transformers-and-attention`, `${L}/ai-ml/generative-ai/llms-pretraining-rlhf`],
  llm_basics: [`${L}/ai-ml/generative-ai/what-is-generative-ai`, `${L}/ai-ml/generative-ai/llms-pretraining-rlhf`],
  llms: [`${L}/ai-ml/generative-ai/llms-pretraining-rlhf`, `${L}/ai-ml/generative-ai/llm-fine-tuning`],
  nlp: [`${L}/ai-ml/nlp/tokenisation-and-embeddings`, `${L}/ai-ml/nlp/bert-encoder-family`],
  embeddings: [`${L}/ai-ml/nlp/tokenisation-and-embeddings`, `${L}/ai-ml/math-foundations/dot-product-similarity`],
  vectordb: [`${L}/ai-ml/math-foundations/dot-product-similarity`, `${L}/ai-ml/nlp/rag-retrieval-augmented-generation`],
  prompt: [`${L}/ai-ml/nlp/prompt-engineering`],
  rag: [`${L}/ai-ml/nlp/rag-retrieval-augmented-generation`, `${L}/ai-ml/generative-ai/advanced-rag`],
  finetuning: [`${L}/ai-ml/nlp/peft-lora-adapters`, `${L}/ai-ml/generative-ai/llm-fine-tuning`, `${L}/ai-ml/generative-ai/llms-pretraining-rlhf`],
  agents: [`${L}/ai-ml/nlp/llm-agents-and-tool-use`, `${L}/ai-ml/generative-ai/agents-tool-use`],
  multimodal: [`${L}/ai-ml/generative-ai/multimodal-models`],
  mlops: [`${L}/ai-ml/mlops/experiment-tracking`, `${L}/ai-ml/mlops/model-deployment`, `${L}/ai-ml/mlops/model-monitoring`, `${L}/ai-ml/mlops/retraining-pipelines`],
  mlops_ai: [`${L}/ai-ml/mlops/model-deployment`, `${L}/ai-ml/mlops/model-monitoring`],
  mldesign: [`${L}/ai-ml/mlops/ml-system-design`],
  deploy: [`${L}/ai-ml/mlops/model-deployment`],
  timeseries: [`${L}/ai-ml/deep-learning/rnns-and-lstms`],

  // Infrastructure and operations
  cicd: [`${L}/data-engineering/cicd-pipelines`],
  terraform: [`${L}/data-engineering/infrastructure-as-code`],
  iac: [`${L}/data-engineering/infrastructure-as-code`],
  automation: [`${L}/data-engineering/infrastructure-as-code`],
  observability: [`${L}/data-engineering/monitoring-observability`, `${L}/apache-kafka/monitoring-observability`],
  cloud_core: [`${L}/aws/introduction`, `${L}/azure/introduction`, `${L}/gcp/introduction`],
  networking_adv: [`${L}/networking/subnetting`, `${L}/networking/routing-fundamentals`, `${L}/networking/firewalls-and-acls`],
  cost: [`${L}/data-engineering/performance-tuning`, `${L}/snowflake/cost-optimization`],
  finops: [`${L}/snowflake/cost-optimization`, `${L}/data-engineering/performance-tuning`],
  ha: [`${L}/apache-kafka/disaster-recovery-multi-region`, `${L}/dbms/crash-recovery`],

  // Security
  security: [`${L}/cybersecurity/what-is-cybersecurity`, `${L}/cybersecurity/cia-triad-security-models`],
  sec_fundamentals: [`${L}/cybersecurity/what-is-cybersecurity`, `${L}/cybersecurity/cia-triad-security-models`, `${L}/cybersecurity/attacker-mindset-kill-chain`],
  crypto: [`${L}/cybersecurity/cryptography-fundamentals`, `${L}/networking/tls-ssl`],
  owasp: [`${L}/cybersecurity/web-attacks-owasp`, `${L}/cybersecurity/secure-coding`],
  siem: [`${L}/cybersecurity/siem-log-analysis`],
  vuln: [`${L}/cybersecurity/vulnerability-management`, `${L}/cybersecurity/vulnerabilities-and-exploits`],
  pentest: [`${L}/cybersecurity/penetration-testing-methodology`, `${L}/cybersecurity/reconnaissance-osint`, `${L}/cybersecurity/scanning-enumeration`, `${L}/cybersecurity/web-app-pentesting`],
  incident: [`${L}/cybersecurity/incident-response`],
  incident_resp: [`${L}/cybersecurity/incident-response`, `${L}/cybersecurity/threat-intelligence-hunting`],
  threat_model: [`${L}/cybersecurity/attacker-mindset-kill-chain`, `${L}/cybersecurity/security-architecture`],
  cloud_sec: [`${L}/cybersecurity/cloud-security`],
  compliance: [`${L}/cybersecurity/compliance-frameworks`],
  iam: [`${L}/cybersecurity/identity-access-management`, `${L}/cybersecurity/cloud-security`],
  network_security: [`${L}/cybersecurity/networking-deep-dive`, `${L}/networking/firewalls-and-acls`, `${L}/networking/ids-and-ips`],
  logging: [`${L}/cybersecurity/siem-log-analysis`],
  cspm: [`${L}/cybersecurity/cloud-security`, `${L}/cybersecurity/compliance-frameworks`],
  secrets: [`${L}/azure/key-vault`],
  container_sec: [`${L}/cybersecurity/api-container-security`],
  devsecops: [`${L}/cybersecurity/devsecops`],
  zero_trust: [`${L}/cybersecurity/security-architecture`],
  security_arch: [`${L}/cybersecurity/security-architecture`],
  cert: [`${L}/cybersecurity/security-certifications`],

  // Overrides where a shared id means something else in one roadmap
  'ml-engineer:cloud': [`${L}/ai-ml/cloud-ml/aws-sagemaker`, `${L}/ai-ml/cloud-ml/gcp-vertex-ai`, `${L}/ai-ml/cloud-ml/azure-ml`],
  'data-engineer:cloud': [`${L}/azure/introduction`, `${L}/aws/introduction`, `${L}/gcp/introduction`],
  'data-engineer:interview': [`${L}/data-engineering/de-interview-questions`, `${L}/sql/interview-questions`],
  'database-administrator:security': [`${L}/dbms/database-security`],
  'cybersecurity-analyst:linux': [`${L}/cybersecurity/linux-for-security`, `${L}/cybersecurity/linux-hardening`],
  'cybersecurity-analyst:networking': [`${L}/cybersecurity/networking-deep-dive`, `${L}/networking/tcp-ip-model`, `${L}/networking/ports-and-sockets`],
  'cybersecurity-analyst:cert': [`${L}/cybersecurity/security-certifications`],
  'cloud-security-engineer:cert': [`${L}/cybersecurity/security-certifications`],
  'cloud-architect:cert': [],
  'python-developer:testing': [`${L}/python/unit-testing-pytest`],
  'python-developer:perf': [`${L}/python/performance-profiling`],
  'ml-engineer:docker': [`${L}/ai-ml/mlops/model-deployment`],
  'devops:cloud': [`${L}/aws/introduction`, `${L}/azure/introduction`],
  'devops:security': [`${L}/cybersecurity/devsecops`],
  'platform-engineer:security': [`${L}/cybersecurity/security-architecture`, `${L}/cybersecurity/devsecops`],
  'frontend:deploy': [],
  'analytics-engineer:testing': [`${L}/dbt/testing-basics`, `${L}/dbt/testing-strategy-at-scale`],
}

/** Lessons for a node on a roadmap: the roadmap's own override, else the shared entry. */
export function lessonsForTopic(roadmapSlug: string, nodeId: string): string[] {
  return TOPIC_LESSONS[`${roadmapSlug}:${nodeId}`] ?? TOPIC_LESSONS[nodeId] ?? []
}
