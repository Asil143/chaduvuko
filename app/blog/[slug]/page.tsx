import Link from 'next/link'
import { ChevronLeft, Clock, Calendar, ArrowRight } from 'lucide-react'
import { notFound } from 'next/navigation'
import { PageViews } from '@/components/ui/PageViews'

const ARTICLES: Record<string, {
  title: string; date: string; readTime: string; tags: string[]
  intro: string; sections: { heading: string; body: string }[]
  cta: { label: string; href: string }
}> = {
  'medallion-architecture-explained': {
    title: 'Medallion Architecture Explained — Bronze, Silver, and Gold in Plain English',
    date: 'March 1, 2026', readTime: '8 min read',
    tags: ['Architecture', 'Data Lake', 'Azure', 'AWS', 'GCP'],
    intro: 'The Medallion Architecture is the most widely used data lake design pattern in 2026. If you are applying for data engineering roles, you will be asked about it in almost every interview. Here is exactly what each layer means, why it exists, and how to implement it on any cloud platform.',
    sections: [
      { heading: 'Why does the Medallion Architecture exist?', body: `Before the Medallion Architecture, data lakes were a mess. Raw data landed in a single location and everyone — analysts, data scientists, downstream pipelines — read directly from it. The result: inconsistent results, schema surprises, and nobody trusting the data.\n\nThe Medallion Architecture solves this by introducing three distinct layers, each with a clear contract about the quality and shape of the data inside it.` },
      { heading: 'Bronze — Raw data, preserved forever', body: `Bronze is the raw layer. Data lands here exactly as it came from the source — no modifications, no cleaning, no transformations. A CSV file lands as a CSV file. JSON from an API lands as JSON.\n\nWhy keep raw data? Because mistakes happen downstream. If your Silver transformation has a bug, you need to reprocess from the original source. Bronze is your safety net and audit trail.\n\nRule: Never modify Bronze data. Append only. Partition by date.` },
      { heading: 'Silver — Clean, validated, and trustworthy', body: `Silver is where cleaning happens. The Silver notebook reads Bronze, applies transformations, and writes back clean Delta Lake data. This includes removing nulls and duplicates, casting strings to proper types, standardizing formats, and adding audit columns.\n\nSilver data is still at row level — not yet aggregated. But it is clean, consistent, and trustworthy. Analysts can query Silver for ad-hoc investigation.` },
      { heading: 'Gold — Aggregated and business-ready', body: `Gold is the final layer. Gold tables are pre-aggregated, optimized for specific business questions, and ready for dashboards without further transformation.\n\nTypical Gold tables: daily sales summary by region and product, customer lifetime value, weekly cohort retention, regional performance rankings.\n\nGold tables are what Power BI, Looker Studio, and Tableau connect to. They are fast because the heavy aggregation happened during the pipeline run — not at query time.` },
      { heading: 'Implementing Medallion on Azure, AWS, and GCP', body: `The pattern is identical on every cloud — only the service names change.\n\nAzure: ADLS Gen2 (storage) + Databricks (transformations) + Synapse (serving)\nAWS: Amazon S3 (storage) + AWS Glue (transformations) + Redshift (serving)\nGCP: Cloud Storage (storage) + Dataflow (transformations) + BigQuery (serving)\n\nLearn the architecture pattern first. The cloud services are just implementations of the same idea.` },
    ],
    cta: { label: 'Build Project 1: Full Medallion Pipeline on Azure', href: '/learn/projects/azure-batch-pipeline' },
  },

  'delta-lake-vs-apache-iceberg': {
    title: 'Delta Lake vs. Apache Iceberg in 2026 — Which Should You Use?',
    date: 'February 22, 2026', readTime: '10 min read',
    tags: ['Delta Lake', 'Apache Iceberg', 'Open Table Format'],
    intro: 'Both Delta Lake and Apache Iceberg are open table formats that bring ACID transactions to your data lake. Both are widely used in production. But they have different strengths, different ecosystems, and different ideal use cases.',
    sections: [
      { heading: 'What is an Open Table Format?', body: `An open table format sits on top of Parquet files in your data lake and adds a metadata layer enabling ACID transactions, schema evolution, time travel, and efficient upserts.\n\nWithout an open table format, a data lake is just a folder of Parquet files — no transactions, no versioning, no reliable reads during writes.` },
      { heading: 'Delta Lake — the Databricks native choice', body: `Delta Lake was created by Databricks and is the default table format in all Databricks workspaces. If your stack is Azure Databricks or AWS Databricks, Delta Lake is the natural choice.\n\nStrengths: tight Databricks integration, excellent documentation, native support in Azure Synapse and Microsoft Fabric, and simple time travel with RESTORE TABLE.\n\nWeakness: historically less portable outside the Databricks ecosystem, though Delta Universal Format is closing this gap.` },
      { heading: 'Apache Iceberg — the multi-engine standard', body: `Apache Iceberg was created at Netflix and is now an Apache Foundation project. It is designed to be engine-agnostic — Spark, Flink, Trino, Snowflake, BigQuery, and Redshift can all read and write Iceberg tables.\n\nStrengths: true multi-engine support not tied to any vendor, AWS natively supports Iceberg in S3 Tables and Athena, GCP BigQuery supports Iceberg tables.\n\nWeakness: slightly more complex to configure initially.` },
      { heading: 'Which should you learn first in 2026?', body: `Azure-focused target jobs: learn Delta Lake first. It is the standard on Azure Databricks and Microsoft Fabric.\n\nAWS or multi-cloud target: learn Iceberg. AWS has made Iceberg a first-class citizen with S3 Tables.\n\nFor your resume: listing both Delta Lake and Apache Iceberg signals that you understand open table formats as a category, not just one vendor implementation. That is a strong signal to senior engineers reviewing your resume.` },
    ],
    cta: { label: 'See Delta Lake in action — Azure Databricks Tutorial', href: '/learn/azure/databricks' },
  },

  'data-engineer-resume-without-experience': {
    title: 'How to Write a Data Engineer Resume When You Have No Work Experience',
    date: 'February 15, 2026', readTime: '12 min read',
    tags: ['Career', 'Resume', 'H1B'],
    intro: 'Recruiters at consulting firms that sponsor H1B visas see hundreds of resumes every week. Most get rejected in under 10 seconds. Here is exactly what separates the resumes that get callbacks from the ones that do not.',
    sections: [
      { heading: 'The core problem with most beginner resumes', body: `Most beginners list technologies without demonstrating how they were used. "Proficient in Python, SQL, Azure, Spark" tells a recruiter nothing. Every resume says this.\n\nWhat recruiters want to see is evidence of applied skill — proof that you have actually used these tools to build something real.` },
      { heading: 'Rule 1: Lead with a project, not a summary', body: `Replace the generic Objective or Summary section with a Projects section at the top. Your project is your experience.\n\nWrong: "Seeking a challenging data engineering role to utilize my skills in Azure and Python."\n\nRight: "Built an end-to-end Medallion Architecture retail sales pipeline on Azure using ADF, Databricks, ADLS Gen2, and Synapse. Processed 50,000 records per run with Bronze to Silver to Gold transformation layers."\n\nNow you have a conversation starter. A recruiter who sees this will ask about it.` },
      { heading: 'Rule 2: Quantify everything', body: `Numbers make achievements concrete. Even on a personal project, you can quantify:\n\n- Volume: "Processed 5,000 sales records per pipeline run"\n- Time: "Reduced query time from 45 seconds to 3 seconds using partitioning"\n- Coverage: "Data quality checks catching 98% of null and duplicate records"\n\nThese are real numbers from your actual project. Use them.` },
      { heading: 'Rule 3: Match job description keywords exactly', body: `ATS systems filter resumes before a human sees them. If the job says "Azure Data Factory" and your resume says "ADF", the ATS may filter you out.\n\nFor every application: copy the job description, highlight every technical term, ensure those exact terms appear in your resume.\n\nMust-have keywords in 2026: Medallion Architecture, Azure Data Factory, Azure Databricks, Delta Lake, ADLS Gen2, PySpark, Apache Spark, ETL, data pipeline, SQL, Python.` },
      { heading: 'What a strong beginner resume looks like', body: `PROJECTS (put this FIRST)\nRetail Sales Batch Pipeline | Azure | 2026\n- End-to-end Medallion Architecture pipeline on Azure\n- Bronze: raw CSV ingestion into ADLS Gen2 partitioned by date\n- Silver: PySpark data quality validation in Azure Databricks\n- Gold: 3 aggregated Delta Lake tables for analyst queries\n- Orchestrated with Azure Data Factory at 2am daily\n- Stack: ADF, Databricks, ADLS Gen2, Synapse, Delta Lake, PySpark\n\nSKILLS\nCloud: Azure (ADF, Databricks, ADLS Gen2, Synapse, Key Vault)\nProcessing: Apache Spark, PySpark, Delta Lake, Medallion Architecture\nLanguages: Python, SQL` },
    ],
    cta: { label: 'Build Project 1 to put on your resume', href: '/learn/projects/azure-batch-pipeline' },
  },

  'adf-vs-airflow-vs-step-functions': {
    title: 'ADF vs. Airflow vs. Step Functions — Which Orchestration Tool Should You Learn?',
    date: 'February 8, 2026', readTime: '9 min read',
    tags: ['ADF', 'Airflow', 'Orchestration'],
    intro: 'Azure Data Factory, Apache Airflow, and AWS Step Functions all orchestrate data pipelines but take fundamentally different approaches. Knowing which to use — and more importantly, why — is one of the things that separates senior data engineers from junior ones.',
    sections: [
      { heading: 'What orchestration actually means', body: `Orchestration answers one question: in what order do things run, and what happens when something fails?\n\nA simple pipeline — extract data, transform it, load it — needs something to say "run transform only after extract succeeds, and alert me if it fails." That is orchestration. Without it, you have a collection of scripts with no coordination.\n\nAll three tools solve this problem differently.` },
      { heading: 'Azure Data Factory — UI-first, Azure-native', body: `ADF is Microsoft's managed orchestration service. You build pipelines in a drag-and-drop UI, connect to 90+ data sources, and schedule runs without writing any code for basic workflows.\n\nBest for: Azure-only stacks, teams that prefer visual pipeline building, organizations already in the Microsoft ecosystem.\n\nLimitation: logic-heavy workflows (complex branching, dynamic configs) become awkward in the UI. And ADF does not exist outside Azure — you cannot take your pipelines to AWS or GCP.` },
      { heading: 'Apache Airflow — code-first, cloud-neutral', body: `Airflow is an open-source Python framework. You write DAGs (Directed Acyclic Graphs) as Python files — tasks, dependencies, schedules, retry logic, all in code.\n\nBest for: complex workflows, multi-cloud environments, teams that prefer code over UI, GCP (Cloud Composer is managed Airflow).\n\nLimitation: you need to manage infrastructure yourself unless using a managed service like Cloud Composer, MWAA on AWS, or Astronomer.\n\nAirflow is the most widely used orchestration tool in the industry. If you only learn one, learn Airflow.` },
      { heading: 'AWS Step Functions — event-driven, serverless', body: `Step Functions is AWS serverless orchestration. You define state machines in JSON/YAML — each state is a Lambda function, Glue job, or ECS task. It is tightly integrated with the AWS ecosystem.\n\nBest for: event-driven architectures, serverless AWS stacks, microservice coordination.\n\nLimitation: the JSON state machine syntax is verbose, and it is AWS-only. Data engineers rarely use it as a primary orchestration tool — it is more of a DevOps and microservices tool that data teams sometimes encounter.` },
      { heading: 'Which should you learn for job market 2026?', body: `Priority order for maximum employability:\n\n1. Apache Airflow — universal, cloud-neutral, most job postings mention it\n2. Azure Data Factory — essential for any Azure data engineering role\n3. AWS Step Functions — only if you are targeting pure AWS roles\n\nOn your resume: if you know Airflow, you can say you know orchestration. If you also know ADF, you cover the entire Azure job market. That combination appears in more job descriptions than any other orchestration pairing.` },
    ],
    cta: { label: 'Learn Azure Data Factory in depth', href: '/learn/azure/adf' },
  },

  'microsoft-fabric-explained': {
    title: 'Microsoft Fabric Explained — Should You Learn It Now or Wait?',
    date: 'February 1, 2026', readTime: '7 min read',
    tags: ['Microsoft Fabric', 'Azure', 'Career'],
    intro: 'Microsoft Fabric is the biggest change to the Azure data engineering landscape since Databricks entered the picture. It unifies the entire Azure data stack into one product. Here is what it actually is, what it replaces, and the honest answer to whether you should prioritize it right now.',
    sections: [
      { heading: 'What is Microsoft Fabric?', body: `Microsoft Fabric is an all-in-one analytics platform launched in 2023. It unifies data integration (ADF), data engineering (Spark), data warehousing (Synapse), real-time analytics (Event Streams), business intelligence (Power BI), and data science — all inside one product with one license.\n\nThink of it as Microsoft deciding: instead of making customers stitch together ADF + Databricks + Synapse + Power BI, we will give them one platform that does everything.` },
      { heading: 'What does Fabric replace?', body: `Fabric does not delete existing services — Azure Databricks, ADF, and Synapse still exist. But Fabric provides overlapping capabilities:\n\n- Data Factory in Fabric replaces standalone ADF for many use cases\n- Lakehouse in Fabric replaces ADLS Gen2 + Databricks for many teams\n- Warehouse in Fabric replaces Synapse Analytics for many analytical workloads\n- Power BI is now native inside Fabric instead of a separate service\n\nFor new Azure projects in 2026, many companies are starting on Fabric instead of building the traditional stack.` },
      { heading: 'OneLake — the key architectural shift', body: `The most important concept in Fabric is OneLake. It is a single logical data lake that spans the entire organization — all Fabric workloads read and write to the same OneLake storage automatically.\n\nThis eliminates the biggest pain point in the traditional Azure stack: copying data between services. In the old world, you moved data from ADLS to Synapse to Power BI. In Fabric, everything shares OneLake — no movement, no copies, no sync.` },
      { heading: 'Should you learn Fabric now or wait?', body: `Honest answer: learn the fundamentals first, then layer in Fabric.\n\nIf you know ADF, Databricks, and Synapse, Fabric takes about one week to understand because the concepts are identical — only the UI and naming changes.\n\nIf you skip the fundamentals and go straight to Fabric, you will struggle because Fabric assumes you understand data pipelines, Spark, and SQL warehouses already.\n\nFor your resume in 2026: mention Fabric awareness. Employers are not yet requiring deep Fabric expertise at entry level, but knowing what it is signals you are following the industry.` },
    ],
    cta: { label: 'Start with the Azure fundamentals first', href: '/learn/azure/introduction' },
  },


  'why-data-engineers-use-parquet': {
    title: 'Why Data Engineers Use Parquet Instead of CSV',
    date: 'March 10, 2026', readTime: '5 min read',
    tags: ['Foundations', 'Storage', 'Architecture'],
    intro: 'If you open any data engineering job description, you will see Parquet listed under required skills. Yet most beginners start with CSV files. Understanding why the industry switched to Parquet — and the specific technical reasons behind it — is one of the most important foundational concepts in data engineering.',
    sections: [
      { heading: 'What is wrong with CSV?', body: `CSV files are human-readable, simple, and universal. So why does every production data pipeline avoid them?\n\nThe problem is how CSV stores data. CSV is row-oriented — each row is written together sequentially. To answer the query SELECT SUM(revenue) FROM sales, a CSV reader must scan every single column in every single row, even though you only need the revenue column.\n\nFor a file with 100 columns and 10 million rows, that means reading roughly 100x more data than necessary. At scale, this becomes the difference between a query running in 3 seconds or 5 minutes.` },
      { heading: 'What Parquet does differently', body: `Parquet is columnar — it stores all values for each column together. To read the revenue column, Parquet reads only the revenue column data and skips everything else.\n\nThis single change has dramatic effects on query performance and storage costs:\n\n- Queries that touch 5 columns out of 100 read 95% less data\n- Columns with similar values compress extremely well (revenue values like 99.99, 100.00, 99.99 compress much better than mixed row data)\n- Typical CSV to Parquet compression: 5x to 10x smaller file size` },
      { heading: 'Predicate pushdown — the second advantage', body: `Parquet stores metadata about each row group — the minimum and maximum value of each column inside that group. When you run WHERE order_date = 2026-01-15, Parquet reads this metadata first and skips any row group where the min and max dates do not include January 15th.\n\nThis is called predicate pushdown, and it is one of the reasons partitioned Parquet tables on cloud storage can query billions of rows in seconds.\n\nCSV has no such metadata — the reader must scan every row to find the matching ones.` },
      { heading: 'When CSV is still fine', body: `CSV is appropriate when:\n- The file is small (under a few hundred MB)\n- A human needs to open and read it directly\n- You are exchanging data with a non-technical system that only accepts CSV\n- You are doing a one-time data migration\n\nFor everything else — production pipelines, data lakes, analytical tables — use Parquet. Your queries will be faster, your storage costs will be lower, and your pipeline will behave predictably at scale.` },
      { heading: 'Parquet on Azure, AWS, and GCP', body: `All three cloud platforms treat Parquet as the default format for data engineering workloads:\n\nAzure: ADLS Gen2 + Databricks use Parquet as the underlying format for Delta Lake tables\nAWS: S3 + Glue + Athena are optimized for Parquet — Athena charges per byte scanned\nGCP: Cloud Storage + BigQuery external tables work natively with Parquet\n\nWhen you write a Delta Lake table in Databricks, you are writing Parquet files with a Delta transaction log on top. Understanding Parquet means understanding what Delta Lake, Iceberg, and Hudi are built on.` },
    ],
    cta: { label: 'See Parquet and Delta Lake in Azure Databricks', href: '/learn/azure/databricks' },
  },

  'spark-interview-questions': {
    title: '15 PySpark Interview Questions Asked at Real Data Engineering Roles',
    date: 'March 5, 2026', readTime: '10 min read',
    tags: ['Interview', 'Apache Spark'],
    intro: 'These are real PySpark questions asked at consulting firms, financial services companies, and technology companies that sponsor H1B visas. For each question, I have included the answer interviewers actually want to hear — not the textbook definition.',
    sections: [
      { heading: 'Fundamentals (expect all of these)', body: `Q1: What is the difference between a transformation and an action in Spark?\nA: Transformations (filter, select, groupBy, join) are lazy — they define a computation plan but do not execute. Actions (count, collect, show, write) trigger actual execution. This lazy evaluation allows Spark to optimize the full execution plan before running anything.\n\nQ2: What is a DataFrame vs an RDD?\nA: RDD is the low-level Spark API — distributed collection of objects with no schema. DataFrame is the higher-level API with a schema, similar to a SQL table. In 99% of production code you use DataFrames. RDDs are rarely written directly anymore.\n\nQ3: What is a partition in Spark?\nA: A partition is a chunk of the data distributed across worker nodes. Spark processes each partition in parallel. Too few partitions = underutilized cluster. Too many = excessive overhead. Rule of thumb: aim for 128-256MB per partition.\n\nQ4: Explain narrow vs wide transformations.\nA: Narrow transformations (filter, select, map) process each partition independently — no data movement between nodes. Wide transformations (groupBy, join, orderBy) require shuffling data across the network, which is expensive. Minimize wide transformations to optimize Spark jobs.` },
      { heading: 'Performance questions (asked at most senior roles)', body: `Q5: Your Spark job is slow. How do you debug it?\nA: Start with the Spark UI — look at the Stages tab for skewed stages (one task taking much longer than others). Check for data skew, excessive shuffles, or small file problems. Use df.explain() to see the physical plan and spot unnecessary shuffles.\n\nQ6: What causes data skew and how do you fix it?\nA: Skew happens when one partition has significantly more data than others — common when joining on a column with a dominant value (like NULL or a single customer ID with millions of rows). Fix with salting: add a random prefix to the skewed key, join on the salted key, then aggregate afterward.\n\nQ7: What is broadcast join and when do you use it?\nA: When joining a large table with a small table (typically under 10MB), broadcast join sends the small table to every worker node, avoiding an expensive shuffle. Use spark.sql.autoBroadcastJoinThreshold or F.broadcast(small_df) explicitly.` },
      { heading: 'Delta Lake questions (common at Azure and Databricks shops)', body: `Q8: What is Delta Lake and why is it used over plain Parquet?\nA: Delta Lake adds ACID transactions, schema enforcement, time travel, and efficient upserts (MERGE) on top of Parquet files. Plain Parquet has no transaction support — concurrent writes can corrupt data. Delta prevents this.\n\nQ9: How does the MERGE statement work in Delta Lake?\nA: MERGE matches rows between source and target on a key, then applies conditional logic: update if matched, insert if not matched, delete if matched and a condition is true. This enables efficient upserts for slowly changing dimensions and incremental loads.\n\nQ10: What is Z-ordering in Delta Lake?\nA: Z-ordering co-locates related data in the same files, so queries with filters on Z-ordered columns skip more files. Use OPTIMIZE table ZORDER BY (column) on columns you frequently filter on.` },
      { heading: 'Code questions (you will write PySpark live)', body: `Q11: Read a CSV, remove nulls in order_id, remove duplicates, write as Delta.\n\nfrom pyspark.sql import functions as F\ndf = spark.read.option("header", True).csv("path/to/file.csv")\ndf = df.filter(F.col("order_id").isNotNull())\ndf = df.dropDuplicates(["order_id"])\ndf.write.format("delta").mode("overwrite").save("path/to/output")\n\nQ12: Calculate 7-day rolling average revenue per customer.\n\nfrom pyspark.sql.window import Window\nwindow = Window.partitionBy("customer_id").orderBy("order_date").rowsBetween(-6, 0)\ndf = df.withColumn("rolling_7d_avg", F.avg("revenue").over(window))` },
      { heading: 'Architecture and design questions', body: `Q13: How do you handle late-arriving data in a streaming pipeline?\nA: Use watermarking in Spark Structured Streaming. Define a watermark on the event timestamp — events arriving later than the watermark threshold are dropped. This bounds state size and memory usage while handling reasonable latency.\n\nQ14: What is the difference between cache() and persist()?\nA: cache() stores data in memory only. persist() allows you to specify storage level — MEMORY_ONLY, MEMORY_AND_DISK, DISK_ONLY. Use persist(MEMORY_AND_DISK) when the DataFrame is large and might not fit entirely in memory.\n\nQ15: Your pipeline processes 50GB daily. It takes 4 hours. How do you speed it up?\nA: First, profile it — identify the bottleneck. Common fixes: increase cluster size, repartition before heavy transforms (df.repartition(200)), replace Python UDFs with native Spark functions (10-100x faster), push filters as early as possible, use Delta Lake Z-ordering on filter columns.` },
    ],
    cta: { label: 'Practice with the full interview prep guide', href: '/learn/interview' },
  },

  'azure-vs-aws-data-engineering': {
    title: 'Azure vs AWS for Data Engineers in 2026 — A Real Comparison',
    date: 'February 28, 2026', readTime: '7 min read',
    tags: ['Azure', 'AWS', 'Career'],
    intro: 'Most data engineers are asked to work on Azure or AWS — and increasingly both. This is a direct comparison of the core services on each platform, focused specifically on what a data engineer actually spends their day using.',
    sections: [
      { heading: 'Storage: ADLS Gen2 vs Amazon S3', body: `Both are object storage services with virtually unlimited capacity. The core architecture is the same — files stored in containers or buckets, accessed via SDKs or pipelines.\n\nADLS Gen2 (Azure) adds hierarchical namespace — you can have real directory structure with file-level permissions using Azure RBAC and Active Directory integration. This matters a lot in enterprise environments that need fine-grained access control down to the folder level.\n\nAmazon S3 is simpler — flat namespace with bucket and prefix. S3 is the most widely used cloud storage service in the world and integrates with everything. S3's IAM permission model is extremely flexible but more complex to configure.\n\nVerdict: both do the same job. Learn S3 if AWS-focused, ADLS Gen2 if Azure-focused. The concepts transfer.` },
      { heading: 'Orchestration: ADF vs AWS Glue / Step Functions', body: `Azure Data Factory is a managed orchestration and ETL service with a rich drag-and-drop UI. It handles pipeline scheduling, monitoring, retries, and connections to 90+ data sources.\n\nAWS splits this responsibility: AWS Glue handles ETL (similar to ADF data flows), while Step Functions handles workflow orchestration. Many AWS teams use Apache Airflow on MWAA instead of Step Functions for complex pipelines.\n\nVerdict: ADF is more unified and beginner-friendly. The AWS equivalent requires combining multiple services. For job market reach, ADF is listed in more Azure job descriptions than Glue is in AWS job descriptions.` },
      { heading: 'Processing: Azure Databricks vs AWS EMR / Databricks', body: `Azure Databricks and AWS Databricks are the same product — Databricks runs on both clouds. If you learn Databricks on Azure, the same PySpark code runs identically on AWS.\n\nAWS also has EMR (Elastic MapReduce) for managed Spark clusters without Databricks. EMR is cheaper than Databricks but requires more manual configuration. Most AWS shops running serious data engineering use Databricks rather than bare EMR.\n\nVerdict: Databricks is cloud-neutral. Learning it on Azure prepares you for AWS and GCP Databricks roles.` },
      { heading: 'Warehousing: Synapse vs Redshift', body: `Azure Synapse Analytics and Amazon Redshift are both distributed SQL data warehouses for analytical workloads.\n\nSynapse integrates tightly with the rest of the Azure stack — ADLS Gen2, Databricks, Power BI all connect natively. Synapse also supports Apache Spark inside the same workspace, blurring the line between data lake and warehouse.\n\nRedshift is AWS-native, tightly integrated with S3, Glue, and IAM. Redshift Spectrum allows querying S3 data directly from Redshift without loading it.\n\nVerdict: similar capabilities, different integration story. If your stack is Azure, Synapse. If AWS, Redshift.` },
      { heading: 'Which should you learn for your first DE job?', body: `For H1B-sponsored jobs in the US: Azure is the better first choice. Enterprise companies — consulting firms, banks, hospitals, government contractors — overwhelmingly use Azure because of existing Microsoft relationships. These organizations sponsor H1B more than pure tech companies.\n\nLook at the H1B visa sponsorship data: the top sponsors are Deloitte, Tata, Cognizant, KPMG, PwC, Accenture. All of them do heavy Azure work for their enterprise clients.\n\nFor product companies and startups: AWS is more common. But these companies sponsor H1B at lower rates.\n\nConclusion: learn Azure first to maximize your H1B job options. Learn AWS second to broaden your market.` },
    ],
    cta: { label: 'Start the Azure Data Engineering track', href: '/learn/azure/introduction' },
  },

  'how-to-get-h1b-data-engineering': {
    title: 'How to Get H1B Sponsorship as a Data Engineer in 2026',
    date: 'March 15, 2026', readTime: '8 min read',
    tags: ['Career', 'H1B'],
    intro: 'Getting an H1B-sponsored data engineering job in the US is achievable — but only if you target the right companies, with the right skills, at the right time. This guide is based on actual H1B disclosure data and hiring patterns at companies that consistently sponsor.',
    sections: [
      { heading: 'Which companies actually sponsor H1B for data engineers?', body: `The top H1B sponsors for data engineering and IT roles every year are consulting and IT services firms, not tech companies:\n\n1. Deloitte — consistently the largest H1B sponsor in the US\n2. Tata Consultancy Services (Accenture)\n3. Cognizant Technology Solutions\n4. KPMG Technologies\n5. PwC\n6. IBMnologies\n7. Accenture\n8. IBM\n9. Deloitte\n10. EY (Ernst and Young)\n\nThese companies place data engineers at Fortune 500 clients — banks, hospitals, retailers, government agencies. They sponsor aggressively because their entire business model depends on bringing in international talent.` },
      { heading: 'What skills do these companies look for?', body: `The tech stack at these companies is heavily Azure and Microsoft-focused because their clients are enterprise companies with Microsoft relationships. The most in-demand skills in 2026:\n\nMust have:\n- Azure Data Factory, Azure Databricks, ADLS Gen2, Azure Synapse\n- PySpark and Python for data transformations\n- SQL — complex analytical queries, not just basic SELECT\n- Medallion Architecture — Bronze, Silver, Gold implementation\n\nStrong differentiators:\n- Delta Lake and open table format knowledge\n- Apache Airflow for orchestration\n- Real project with end-to-end pipeline code on GitHub\n- DP-203 certification (Azure Data Engineer Associate)` },
      { heading: 'The resume strategy that works', body: `Your resume needs to answer one question immediately: can this person build a data pipeline on Azure?\n\nThe fastest way to answer yes convincingly without prior work experience:\n\n1. Build a complete Medallion Architecture project on Azure — ADF + Databricks + ADLS Gen2 + Synapse\n2. Put it on GitHub with a proper README\n3. Deploy it on a real Azure account (free tier gets you started)\n4. Write 3 strong resume bullet points quantifying what it does\n\nThis project puts you in the top 20% of applicants for entry-level consulting roles because most applicants have zero real Azure project work.` },
      { heading: 'Timing: when to apply', body: `H1B cap petitions are filed in April every year for work starting October 1st. The lottery registration opens in March.\n\nThis means consulting firms are most actively hiring candidates for H1B sponsorship between October and February — they want people onboarded and on projects before the next April filing deadline.\n\nBest time to apply: October through February. Apply in volume — 30 to 50 applications across all the consulting firms simultaneously. Response rates are low; volume matters.` },
      { heading: 'The OPT to H1B path', body: `If you are on OPT (F-1 visa optional practical training), the path is:\n\n1. Land a consulting firm job on OPT — easier because they can hire you immediately\n2. Perform well — get rated highly by your project client\n3. The firm files your H1B petition in April\n4. You transition from OPT to H1B in October\n\nSome firms offer STEM OPT extension support and H1B sponsorship as a package. Ask explicitly during the hiring process — not all recruiters will volunteer this information.\n\nIf your STEM OPT expires before October: look for firms that offer cap-exempt H1B sponsorship or can support H1B transfer from another employer.` },
    ],
    cta: { label: 'See which companies hire data engineers', href: '/learn/industry' },
  },


  'apache-spark-architecture-explained': {
    title: 'Apache Spark Architecture Explained — How Spark Actually Works',
    date: 'March 18, 2026', readTime: '8 min read',
    tags: ['Apache Spark', 'Architecture'],
    intro: 'Every data engineer uses Spark but most cannot explain how it works under the hood. Understanding the architecture — drivers, executors, DAGs, stages — is what separates engineers who can debug slow jobs from those who just restart the cluster and hope.',
    sections: [
      { heading: 'Driver and Executors', body: `Spark runs on a master-worker architecture. The Driver is the brain — it runs your main program, builds the execution plan, and coordinates everything. Executors are the workers — JVM processes running on worker nodes that do the actual computation.\\n\\nWhen you call spark.read().csv("..."), nothing happens yet. The Driver records this as a transformation. When you call count() or write(), the Driver compiles all recorded transformations into a DAG and sends tasks to Executors.` },
      { heading: 'DAG — Directed Acyclic Graph', body: `Every Spark job becomes a DAG of stages. A stage is a set of tasks that can be computed without shuffling data across the network.\\n\\nWhen Spark hits a wide transformation (groupBy, join, orderBy), it must shuffle data — all rows with the same key must end up on the same partition. This creates a stage boundary. Understanding stage boundaries tells you exactly where your job is spending time.` },
      { heading: 'How partitions map to tasks', body: `Each partition becomes one task. If your DataFrame has 200 partitions, Spark creates 200 tasks per stage. Each Executor runs multiple tasks in parallel based on available cores.\\n\\nIf you have 10 Executors with 4 cores each, Spark runs 40 tasks in parallel. With 200 partitions that's 5 waves of computation. Tuning partition count directly controls parallelism.` },
      { heading: 'The Catalyst optimizer', body: `Before running anything, Spark's Catalyst optimizer rewrites your query plan. It pushes filters down (reads less data), reorders joins (smaller tables first), and combines projections.\\n\\nThis is why df.filter(...).select(...) and df.select(...).filter(...) produce the same physical plan. Catalyst normalizes both into the optimal execution order. Use df.explain(True) to see what Catalyst actually runs.` },
      { heading: 'What this means for your code', body: `Writing good Spark code means helping the optimizer — filter early, avoid Python UDFs (they bypass Catalyst), partition on join keys, and cache DataFrames you reuse multiple times.\\n\\nBad Spark code is not wrong — it produces correct results. It just wastes cluster time and money. Understanding the architecture means you can look at a slow job and immediately know whether the bottleneck is shuffles, data skew, small files, or missing filters.` },
    ],
    cta: { label: 'Practice Spark in Azure Databricks', href: '/learn/azure/databricks' },
  },

  'data-quality-in-pipelines': {
    title: 'Data Quality in Production Pipelines — What to Check and When',
    date: 'March 17, 2026', readTime: '7 min read',
    tags: ['Architecture', 'Foundations'],
    intro: 'Bad data flowing silently through a pipeline is worse than a broken pipeline. A broken pipeline stops. Bad data corrupts reports, misleads analysts, and causes business decisions based on wrong numbers. Data quality checks are not optional — they are the difference between a pipeline and a reliable pipeline.',
    sections: [
      { heading: 'The four categories of data quality issues', body: `Completeness: required fields are null or missing. A sales record with no customer_id is unusable.\\n\\nAccuracy: values are present but wrong. A revenue field showing negative values or dates in the future.\\n\\nConsistency: the same entity has different representations. Customer ID 101 in one system, CUST-101 in another.\\n\\nTimeliness: data is correct but arrived too late to be useful. Last week's inventory data used for today's reorder decision.` },
      { heading: 'Where to apply checks in the Medallion Architecture', body: `Bronze layer: check row counts only. Did we receive data? Is the file size plausible? Never transform or filter at Bronze — just alert if something looks wrong.\\n\\nSilver layer: this is where quality checks live. Check nulls on required columns, remove duplicates, validate ranges, cast types. Rows that fail checks go to a quarantine table, not the trash.\\n\\nGold layer: check aggregation logic. Does total revenue match the sum of line items? Are there unexpected zeros in KPI columns?` },
      { heading: 'Practical checks to implement first', body: `Start with these five checks in every Silver notebook:\\n\\n1. Row count — did we get any data? Is the count suspiciously low compared to yesterday?\\n2. Null check on primary keys — filter out any row where the join key is null\\n3. Duplicate check — deduplicate on natural key before writing\\n4. Range validation — is order_amount between 0 and 1,000,000? Flag extremes\\n5. Referential integrity — does every customer_id in orders exist in the customers table?` },
      { heading: 'What to do when checks fail', body: `Never silently drop bad rows in production. Write them to a quarantine or rejected records table with the reason for rejection.\\n\\nThis lets you investigate root causes: is the source system sending bad data? Is the schema changing? Is a new upstream team sending test data into production?\\n\\nFor critical pipelines: raise an alert and stop the pipeline. A Gold table with missing data is better than a Gold table with wrong data that analytics teams trust.` },
    ],
    cta: { label: 'See data quality in Project 1', href: '/learn/projects/azure-batch-pipeline' },
  },

  'what-is-a-data-lakehouse': {
    title: 'What Is a Data Lakehouse? The Architecture Replacing the Data Warehouse',
    date: 'March 16, 2026', readTime: '6 min read',
    tags: ['Architecture', 'Foundations'],
    intro: 'The data lakehouse combines the low-cost storage of a data lake with the reliability and performance of a data warehouse. It is the dominant architecture pattern being adopted by enterprise companies in 2026, and it is what Databricks, Delta Lake, Apache Iceberg, and Microsoft Fabric are all built around.',
    sections: [
      { heading: 'The problem with data lakes and data warehouses separately', body: `Data warehouses (Snowflake, Redshift, Synapse) are fast, reliable, and support ACID transactions. But they are expensive and only work with structured data.\\n\\nData lakes (S3, ADLS Gen2, GCS) are cheap and handle any data type — CSV, JSON, images, logs. But they are unreliable for concurrent reads and writes, have no transaction support, and queries are slow on raw files.\\n\\nMost companies ended up with both: a data lake for raw storage and a data warehouse for analytics. This meant copying data twice, maintaining two systems, and paying twice.` },
      { heading: 'What the lakehouse adds', body: `The lakehouse adds a metadata and transaction layer — Delta Lake, Apache Iceberg, or Apache Hudi — directly on top of cloud object storage.\\n\\nThis layer provides ACID transactions (no corruption during concurrent writes), schema enforcement (no silent schema changes), time travel (query data as it was yesterday), and efficient upserts (MERGE statements that work like a database).\\n\\nNow you get warehouse reliability at lake cost. One copy of data, queryable by both Spark for heavy transformation and SQL engines for analytics.` },
      { heading: 'Lakehouse on each cloud platform', body: `Azure: ADLS Gen2 + Delta Lake (via Databricks or Microsoft Fabric) + Synapse for SQL serving\\nAWS: Amazon S3 + Apache Iceberg (via S3 Tables) + Athena or Redshift Spectrum for SQL\\nGCP: Cloud Storage + BigQuery external tables (Iceberg or Parquet) + BigQuery for SQL\\n\\nThe pattern is identical on every cloud. Learn the concept once, apply it anywhere.` },
      { heading: 'Is this replacing the traditional data warehouse?', body: `For new projects: yes, most teams build lakehouse-first. Storing everything in S3/ADLS with Iceberg or Delta, then using Athena/Synapse/BigQuery as the SQL layer on top.\\n\\nFor existing warehouses: no immediate replacement. Snowflake, Redshift, and dedicated Synapse pools still run most enterprise analytical workloads. But the direction is clear — the industry is consolidating toward the lakehouse pattern.\\n\\nFor your career: understanding the lakehouse architecture is now a baseline requirement for senior DE roles.` },
    ],
    cta: { label: 'See Medallion Architecture — the lakehouse in practice', href: '/blog/medallion-architecture-explained' },
  },

  'adls-gen2-best-practices': {
    title: 'ADLS Gen2 Best Practices — How to Structure Your Azure Data Lake',
    date: 'March 14, 2026', readTime: '6 min read',
    tags: ['Azure', 'Storage'],
    intro: 'Most Azure data engineers set up ADLS Gen2 incorrectly at the start. The mistakes made early — poor container structure, wrong partitioning strategy, incorrect access controls — are expensive to fix later when pipelines are running at scale.',
    sections: [
      { heading: 'Container structure', body: `Use one container per Medallion layer, not one container per project:\\n\\nbronze/\\nsilver/\\ngold/\\n\\nInside each container, organize by domain then by source system then by date:\\nbronze/sales/orders/2026/03/15/\\nbronze/hr/employees/2026/03/15/\\n\\nThis structure makes lifecycle management policies easy — you can expire bronze data older than 90 days at the container prefix level without affecting silver or gold.` },
      { heading: 'Partitioning strategy', body: `Always partition by date. For most batch pipelines: year/month/day partitioning.\\n\\nbronze/sales/orders/year=2026/month=03/day=15/\\n\\nThis date-based partition pruning is critical for performance. A query for last week reads 7 partitions, not the entire dataset.\\n\\nFor high-volume tables: also partition by a secondary key like region or source_system. But do not over-partition — partitions smaller than 128MB create the small files problem.` },
      { heading: 'Access control', body: `Use Azure RBAC for container-level access and ACLs for folder-level access. Never use storage account keys in application code — use Managed Identity or Service Principals.\\n\\nIn practice: Databricks clusters get a Service Principal with Storage Blob Data Contributor on the storage account. ADF pipelines use Managed Identity. No passwords or keys in code or configuration.\\n\\nSet up separate Service Principals for bronze writes, silver reads/writes, and gold reads. Principle of least privilege prevents a silver transformation bug from accidentally overwriting bronze.` },
      { heading: 'Small files problem and how to fix it', body: `Streaming pipelines and frequent micro-batch runs create thousands of tiny Parquet files. Querying 10,000 files of 1MB each is far slower than querying 10 files of 1GB each.\\n\\nFix with Delta Lake OPTIMIZE: run OPTIMIZE table on a schedule (daily is usually enough). This compacts small files into larger ones automatically.\\n\\nFor Synapse external tables pointing at ADLS: use CETAS (Create External Table As Select) to produce clean, evenly-sized Parquet files.` },
    ],
    cta: { label: 'Deep dive into ADLS Gen2', href: '/learn/azure/adls-gen2' },
  },

  'azure-key-vault-for-data-engineers': {
    title: 'Azure Key Vault for Data Engineers — Stop Putting Secrets in Your Code',
    date: 'March 13, 2026', readTime: '5 min read',
    tags: ['Azure', 'Security'],
    intro: 'Secrets in code are the most common security mistake in data engineering. Connection strings, API keys, and storage account keys hardcoded in notebooks, pipeline configs, or environment variables get committed to Git and end up exposed. Azure Key Vault is the solution — and it takes 15 minutes to set up properly.',
    sections: [
      { heading: 'What Key Vault does', body: `Azure Key Vault is a managed secrets store. You store secrets (passwords, connection strings, API keys, certificates) in Key Vault and retrieve them at runtime using managed identity — no credentials in your code at all.\\n\\nAudit logs track every secret access. You can rotate secrets without changing any code. You can revoke access to a specific secret immediately without touching other resources.` },
      { heading: 'Key Vault with Azure Databricks', body: `In Databricks, create a secret scope backed by Key Vault:\\n\\ndbutils.secrets.get(scope="kv-scope", key="storage-account-key")\\n\\nDatabricks calls Key Vault at runtime using its Managed Identity. The secret value never appears in notebook output or logs. Even if someone shares the notebook, they cannot see the actual secret value.\\n\\nThis is the correct way to store ADLS access keys, database connection strings, and API keys used in Databricks notebooks.` },
      { heading: 'Key Vault with Azure Data Factory', body: `In ADF, create a Linked Service and select Azure Key Vault as the authentication method. ADF retrieves the secret at pipeline runtime using its Managed Identity.\\n\\nBest practice: store all ADF Linked Service passwords in Key Vault. This means your ADF pipeline JSON configuration contains only Key Vault references — no actual credentials. Safe to commit to Git, safe to share with colleagues.` },
      { heading: 'Setting it up in 15 minutes', body: `1. Create a Key Vault in Azure Portal\\n2. Add your secrets (storage account key, database password, API keys)\\n3. Grant your Databricks Managed Identity the Key Vault Secrets User role\\n4. In Databricks: create a secret scope pointing to your Key Vault URL\\n5. Replace all hardcoded secrets with dbutils.secrets.get() calls\\n\\nFor ADF: enable System Managed Identity on the ADF instance, grant it Key Vault Secrets User, and update Linked Services to reference Key Vault secrets.` },
    ],
    cta: { label: 'Build the full Azure pipeline with security best practices', href: '/learn/projects/azure-batch-pipeline' },
  },

  'what-is-apache-kafka': {
    title: 'What Is Apache Kafka? A Plain English Explanation for Data Engineers',
    date: 'March 12, 2026', readTime: '7 min read',
    tags: ['Streaming', 'Architecture'],
    intro: 'Apache Kafka appears in almost every senior data engineering job description. Most beginners understand it as a message queue but that undersells what it actually is and why it changed how companies build data pipelines.',
    sections: [
      { heading: 'Kafka in one sentence', body: `Kafka is a distributed, durable, high-throughput event streaming platform. Producers write events to Kafka topics. Consumers read from those topics at their own pace. Events are stored durably — not deleted after consumption — so multiple systems can read the same events independently.` },
      { heading: 'Why Kafka instead of a database or message queue', body: `A database stores current state. Kafka stores the history of events that created that state. This is the fundamental difference.\\n\\nA message queue (RabbitMQ, SQS) delivers a message once and deletes it. Kafka retains messages for days or weeks. Multiple consumers read the same message independently without affecting each other.\\n\\nThis means: a single stream of user clickstream events can simultaneously feed a real-time dashboard, a fraud detection model, and a batch analytics pipeline — all reading from the same Kafka topic at different speeds.` },
      { heading: 'Core concepts', body: `Topic: a named, ordered log of events. Like a table but append-only.\\n\\nPartition: topics are split into partitions for parallelism. A topic with 12 partitions supports 12 consumers reading in parallel.\\n\\nConsumer group: a group of consumers that cooperate to read a topic — each partition is assigned to exactly one consumer in the group. Add more consumers to increase throughput.\\n\\nOffset: each message has a position number in its partition. Consumers track their offset — if a consumer restarts, it resumes from where it left off. This enables exactly-once processing semantics.` },
      { heading: 'Kafka in cloud data engineering', body: `Cloud-managed Kafka equivalents:\\nAzure: Azure Event Hubs (Kafka-compatible API — same code works)\\nAWS: Amazon Kinesis (different API) or Amazon MSK (managed Kafka)\\nGCP: Google Pub/Sub (different API) or Confluent Cloud\\n\\nFor learning: understanding Kafka concepts prepares you for all of them. The partition, consumer group, and offset model is identical on Event Hubs and MSK.` },
    ],
    cta: { label: 'Learn Azure Event Hubs — Kafka on Azure', href: '/learn/aws/kinesis' },
  },

  'slowly-changing-dimensions-explained': {
    title: 'Slowly Changing Dimensions Explained — SCD Type 1, 2, and 3',
    date: 'March 11, 2026', readTime: '6 min read',
    tags: ['Architecture', 'Foundations'],
    intro: 'Slowly Changing Dimensions (SCDs) appear in almost every data warehousing interview. They describe how to handle changes to dimension data over time — and getting this decision wrong can corrupt your entire historical analysis.',
    sections: [
      { heading: 'What is a dimension and why does it change slowly?', body: `In a data warehouse, facts are measurements (a sale happened, an event occurred) and dimensions are the context (who, what, where). Customer name, product category, store location — these change infrequently but they do change.\\n\\nWhen a customer moves cities, or a product changes category, you have a choice: overwrite the old value, keep both, or track the change date. That choice is your SCD type.` },
      { heading: 'SCD Type 1 — Overwrite', body: `Simply overwrite the old value with the new one. No history is kept.\\n\\nUse when: history does not matter. Fixing a typo in a customer name. Updating a product weight. Cases where the old value was wrong.\\n\\nImplementation in Spark or SQL: MERGE statement that updates the target row when the source key matches.\\n\\nWeakness: historical reports change retroactively. A sales report from last year will show the customer's current city, not the city they lived in when the sale happened.` },
      { heading: 'SCD Type 2 — Add a new row', body: `When a value changes, keep the old row and add a new row with the new value. Use effective_date, expiry_date, and is_current columns to track which row is active.\\n\\nThis is the most common SCD type in production data warehouses. Every historical fact points to the dimension row that was active at the time.\\n\\nImplementation: MERGE with matched and not-matched conditions. When a change is detected on a matched key, expire the current row (set expiry_date, is_current = false) and insert the new row.\\n\\nUse when: historical accuracy matters. Customer location for regional sales analysis. Employee department for headcount history.` },
      { heading: 'SCD Type 3 — Add a column', body: `Add a new column to store the previous value: current_city and previous_city.\\n\\nUse when: you only need to compare the current value to the immediately previous one — not full history.\\n\\nWeakness: only tracks one previous value. If a customer moves three times, you lose the first two addresses. Rarely used in modern pipelines where storage is cheap and Type 2 adds full history.` },
    ],
    cta: { label: 'Build a pipeline with SCDs in Project 1', href: '/learn/projects/azure-batch-pipeline' },
  },

  'etl-vs-elt-explained': {
    title: 'ETL vs ELT — Why the Industry Switched and What It Means for Your Work',
    date: 'March 9, 2026', readTime: '5 min read',
    tags: ['Architecture', 'Foundations'],
    intro: 'ETL and ELT both move data from source to destination but in a different order. Understanding why the industry shifted from ETL to ELT — and when to use each — is a fundamental data engineering concept.',
    sections: [
      { heading: 'ETL — Extract, Transform, Load', body: `Traditional ETL extracts data from source, transforms it on a separate compute engine (SSIS, Informatica, custom scripts), then loads the clean, transformed data into the destination.\\n\\nThe transformation happens before loading. The destination only ever sees clean data.\\n\\nWhy it was used: 20 years ago, storage was expensive and databases were slow. Storing raw data was wasteful. Loading dirty data into an expensive Oracle database was unacceptable. So you cleaned it first, then stored only the clean version.` },
      { heading: 'ELT — Extract, Load, Transform', body: `Modern ELT extracts raw data and loads it directly into cloud storage or a data warehouse first. Transformation happens after loading, inside the destination system using its compute power.\\n\\nOn Azure: raw data lands in ADLS Gen2 (Bronze), then Databricks transforms it inside the lake (Silver, Gold). This is ELT — the load happens before the transform.\\n\\nOn AWS: raw data lands in S3, Glue transforms it in-place. Same ELT pattern.` },
      { heading: 'Why ELT won', body: `Cloud storage is extremely cheap — storing raw data costs almost nothing. Cloud compute (Spark, BigQuery, Redshift) is powerful and scalable.\\n\\nKeeping raw data means you can reprocess with new logic whenever requirements change. With ETL, if you discovered a bug in your transformation after loading, the raw data was gone.\\n\\nELT also enables the Medallion Architecture — Bronze is your raw EL layer, Silver and Gold are the T layer. The clear separation of loading and transformation makes debugging and reprocessing straightforward.` },
      { heading: 'When ETL is still correct', body: `ETL still makes sense when: data contains PII that must be masked before storage, transformations are regulatory requirements that cannot be bypassed, or the destination system has strict schema requirements and cannot accept raw data.\\n\\nFor 95% of modern cloud data engineering work: ELT. Keep raw data in Bronze, transform in Silver.` },
    ],
    cta: { label: 'See ELT in action in the Roadmap', href: '/learn/roadmap' },
  },

  'aws-glue-vs-databricks': {
    title: 'AWS Glue vs Databricks on AWS — Which Should You Use?',
    date: 'March 8, 2026', readTime: '6 min read',
    tags: ['AWS', 'Apache Spark'],
    intro: 'Both AWS Glue and Databricks run Apache Spark on AWS. Both transform data. Both connect to S3. So why do some AWS shops use Glue and others use Databricks — and how do you know which one is right for a given situation?',
    sections: [
      { heading: 'What AWS Glue actually is', body: `AWS Glue is a fully managed serverless ETL service. You write Python or Scala scripts using the Glue DynamicFrame API (or standard PySpark), and Glue provisions the Spark cluster, runs your job, and tears it down — you only pay for the compute time used.\\n\\nGlue also includes a data catalog (schema registry), crawlers (automatic schema detection), and Studio (a visual ETL builder). It is tightly integrated with the AWS ecosystem — IAM, S3, Athena, Redshift, and Lake Formation all work natively with Glue.` },
      { heading: 'What Databricks on AWS adds', body: `Databricks is a managed Spark platform — but much more than a job runner. It adds interactive notebooks, MLflow for ML experiment tracking, Delta Live Tables for declarative pipeline management, Unity Catalog for data governance, and a collaborative workspace.\\n\\nDatabricks clusters are persistent and interactive — you can run ad-hoc queries, iterate on transformation logic, and share notebooks with colleagues. Glue jobs are batch-only — you submit a job, it runs, it stops.` },
      { heading: 'When to use Glue', body: `AWS-only stack with simple to medium complexity transformations. Teams that want serverless with no cluster management. Organizations already deeply in the AWS ecosystem where native IAM and Lake Formation integration matters.\\n\\nGlue is excellent for: S3 to Redshift loads, data catalog management, schema crawling, and straightforward batch ETL that runs on a schedule.\\n\\nGlue is not great for: complex iterative development, real-time debugging, ML pipelines, or teams that want a collaborative notebook environment.` },
      { heading: 'When to use Databricks', body: `Teams doing serious data engineering with complex transformations, ML workloads, or real-time streaming. Organizations that want the same platform to work across AWS, Azure, and GCP. Engineers who want a proper development environment with interactive notebooks and version control.\\n\\nCost consideration: Databricks costs more than Glue for equivalent compute. But developer productivity on complex jobs is significantly higher, which often offsets the cost.\\n\\nJob market: Databricks knowledge transfers across clouds. Glue knowledge is AWS-specific.` },
    ],
    cta: { label: 'Learn AWS Glue in depth', href: '/learn/aws/glue' },
  },

  'redshift-vs-bigquery-vs-synapse': {
    title: 'Redshift vs BigQuery vs Synapse — Choosing a Cloud Data Warehouse',
    date: 'March 7, 2026', readTime: '7 min read',
    tags: ['AWS', 'GCP', 'Azure'],
    intro: 'Amazon Redshift, Google BigQuery, and Azure Synapse are the three dominant cloud data warehouses. Choosing between them is less about which is technically superior and more about which cloud your organization is on and what workload you are running.',
    sections: [
      { heading: 'Architecture differences', body: `Redshift: cluster-based MPP (Massively Parallel Processing). You provision a cluster of nodes, data is distributed across them, and queries execute in parallel. You pay for the cluster whether it is running queries or idle.\\n\\nBigQuery: serverless. No cluster to provision. Google manages all compute automatically. You pay per query (per terabyte scanned) or with flat-rate reservations. Scales to petabytes automatically.\\n\\nSynapse Analytics: hybrid. Dedicated SQL pools (cluster-based, like Redshift) and Serverless SQL pools (query-on-demand, like BigQuery). You choose based on workload pattern.` },
      { heading: 'Performance and cost patterns', body: `BigQuery excels at unpredictable, variable workloads. No cluster to right-size. A query that needs 1000 slots gets them automatically. Cost is directly proportional to data scanned — use partitioning and clustering to minimize scanned bytes.\\n\\nRedshift excels at steady, predictable workloads with consistent concurrency. A properly provisioned Redshift cluster with good distribution keys outperforms BigQuery on latency for repetitive dashboard queries.\\n\\nSynapse serverless is cost-effective for ad-hoc exploration over ADLS data. Synapse dedicated pools suit consistent BI workloads.` },
      { heading: 'Ecosystem integration', body: `Redshift: tightest integration with AWS services — S3, Glue, Lake Formation, Kinesis. Redshift Spectrum queries S3 directly without loading. Deep AWS IAM integration.\\n\\nBigQuery: first-class citizen in GCP. Looker Studio connects natively. Dataflow outputs directly to BigQuery. BigQuery ML runs models inside the warehouse using SQL.\\n\\nSynapse: native Power BI integration (one click from Synapse workspace). Direct access to ADLS Gen2 Delta Lake tables via external tables. Microsoft Fabric builds on top of Synapse capabilities.` },
      { heading: 'Which should you learn?', body: `Learn the one that matches your target job market:\\n\\nTargeting Azure-heavy enterprise jobs: Synapse Analytics\\nTargeting AWS roles: Redshift\\nTargeting GCP or analytics engineering roles: BigQuery\\n\\nConceptually, all three are SQL-based MPP warehouses. If you understand one deeply — partitioning, distribution keys, query optimization — you can pick up the others in a week.` },
    ],
    cta: { label: 'Learn Synapse Analytics', href: '/learn/azure/synapse' },
  },

  'bigquery-cost-optimization': {
    title: 'BigQuery Cost Optimization — How to Stop Paying for Queries You Do Not Need',
    date: 'March 6, 2026', readTime: '6 min read',
    tags: ['GCP', 'BigQuery'],
    intro: 'BigQuery charges per terabyte scanned. A single analyst running SELECT * on a 10TB table costs around $50. Multiplied across a team running queries all day, unoptimized BigQuery usage can generate surprising bills. These are the practical optimizations that make the biggest difference.',
    sections: [
      { heading: 'Partitioning — the most impactful change', body: `Partition your tables by date. A query with WHERE event_date = "2026-03-15" on a partitioned table reads only that day's partition — not the full table.\\n\\nCREATE TABLE myproject.dataset.events\\nPARTITION BY DATE(event_date)\\nAS SELECT * FROM source_table;\\n\\nFor a 2-year table queried daily: partitioning reduces bytes scanned by roughly 700x (730 days, querying 1 at a time). This is the single highest-impact optimization for most teams.` },
      { heading: 'Clustering — the second layer of optimization', body: `Clustering co-locates rows with similar values in the same storage blocks. Queries filtering on clustered columns skip entire blocks.\\n\\nCluster on columns you frequently filter on after partitioning: user_id, country, product_category.\\n\\nCREATE TABLE myproject.dataset.events\\nPARTITION BY DATE(event_date)\\nCLUSTER BY user_id, country\\nAS SELECT * FROM source_table;\\n\\nCombined partitioning and clustering can reduce bytes scanned by 99%+ on well-structured analytical queries.` },
      { heading: 'Never use SELECT *', body: `BigQuery charges for every column in your SELECT. A table with 50 columns — SELECT * reads all 50 columns. SELECT id, revenue, date reads just 3 columns.\\n\\nColumnar storage means each column is stored separately. Selecting fewer columns directly reduces bytes scanned and cost.\\n\\nFor exploration: use the table preview feature in the BigQuery console — it is free and does not scan any data.` },
      { heading: 'Materialized views and cached results', body: `BigQuery caches query results for 24 hours. An identical query run twice in 24 hours charges only for the first run.\\n\\nFor dashboard queries that run on a schedule: create materialized views. BigQuery maintains them automatically and queries against materialized views scan much less data than the underlying tables.\\n\\nFor recurring aggregations (daily revenue by region): write results to a summary table with a scheduled query rather than re-aggregating the full table on every dashboard load.` },
    ],
    cta: { label: 'Learn BigQuery in depth', href: '/learn/gcp/bigquery' },
  },

  'cloud-composer-vs-managed-airflow': {
    title: 'Cloud Composer vs Self-Managed Airflow — What GCP Data Engineers Should Know',
    date: 'March 4, 2026', readTime: '5 min read',
    tags: ['GCP', 'Orchestration'],
    intro: 'Cloud Composer is managed Apache Airflow on GCP. It removes infrastructure management but adds cost and some constraints. This is what you need to know before deciding between Composer and running Airflow yourself.',
    sections: [
      { heading: 'What Cloud Composer manages for you', body: `When you create a Composer environment, GCP provisions: a GKE cluster running Airflow scheduler and workers, a Cloud SQL database for Airflow metadata, Cloud Storage bucket for DAG storage, and networking and IAM configuration.\\n\\nYou get the Airflow UI, DAG versioning, and full Airflow functionality without managing any of this infrastructure. Updates to Airflow versions are handled by GCP.` },
      { heading: 'The cost consideration', body: `Cloud Composer is expensive relative to self-managed Airflow. A basic Composer 2 environment runs around $300-500/month minimum just for the infrastructure, before any actual pipeline compute.\\n\\nFor startups or small teams: self-managed Airflow on a single GCE VM costs $30-50/month and works well for tens of DAGs.\\n\\nFor enterprise teams at scale: Composer's managed nature, SLA, and GCP integration justify the cost.` },
      { heading: 'Native GCP integrations', body: `Composer has first-class operators for every GCP service: BigQueryOperator, DataflowTemplateOperator, GCSToGCSOperator, DataprocSubmitJobOperator.\\n\\nThese operators handle authentication automatically using the Composer service account — no credential management in DAGs. This tight integration is the primary advantage over self-managed Airflow for GCP-heavy stacks.` },
      { heading: 'When each is right', body: `Use Cloud Composer when: your team is already on GCP, you have multiple complex pipelines, and infrastructure management is not your core competency.\\n\\nUse self-managed Airflow when: you are in early stage, cost matters, or you need custom Airflow plugins not supported by Composer.\\n\\nUse Astronomer (managed Airflow) when: you are multi-cloud and want managed Airflow that is not tied to GCP.` },
    ],
    cta: { label: 'Learn Cloud Composer', href: '/learn/gcp/composer' },
  },

  'dataflow-vs-spark-streaming': {
    title: 'Google Dataflow vs Apache Spark Streaming — Streaming Processing Compared',
    date: 'March 3, 2026', readTime: '6 min read',
    tags: ['GCP', 'Streaming'],
    intro: 'Both Google Dataflow and Apache Spark Structured Streaming process data in real time. They take fundamentally different approaches, and choosing between them depends on your cloud, your team, and your latency requirements.',
    sections: [
      { heading: 'How Dataflow works', body: `Dataflow is a fully managed stream and batch processing service based on Apache Beam. You write pipelines using the Beam SDK (Python or Java), defining a series of transforms on a PCollection (parallel collection of data).\\n\\nDataflow is serverless — no cluster management. Google auto-scales workers based on throughput. The same Beam pipeline code runs on both streaming and batch data without modification.` },
      { heading: 'How Spark Structured Streaming works', body: `Spark Structured Streaming is a micro-batch processing engine built on top of the Spark SQL engine. Incoming data is treated as an unbounded table. You write SQL or DataFrame queries on this table, and Spark runs them incrementally as new data arrives.\\n\\nSpark streaming is not truly event-by-event — it processes in micro-batches (every few seconds). For most use cases this is perfectly fine. For millisecond latency requirements, you need Apache Flink or a true event streaming engine.` },
      { heading: 'Key differences in practice', body: `Latency: Dataflow with streaming mode handles per-event processing. Spark streaming processes micro-batches (seconds granularity).\\n\\nEase of use: Spark DataFrame API is familiar to most data engineers. Beam SDK has a steeper learning curve.\\n\\nCost: Dataflow is priced per vCPU and memory second with auto-scaling. Spark on Dataproc requires managing cluster size.\\n\\nEcosystem: Dataflow integrates natively with Pub/Sub, BigQuery, and GCS. Spark integrates with everything but requires more configuration.` },
      { heading: 'Which to learn for GCP roles', body: `For GCP data engineering roles: know Dataflow conceptually and understand the Apache Beam model. Most GCP job descriptions list Dataflow as a requirement.\\n\\nFor AWS or multi-cloud roles: Spark Structured Streaming knowledge transfers everywhere — Databricks, EMR, Glue all use it.\\n\\nFor your first GCP streaming project: Pub/Sub → Dataflow → BigQuery is the canonical GCP streaming pattern. Learn this end to end.` },
    ],
    cta: { label: 'Learn Google Dataflow', href: '/learn/gcp/dataflow' },
  },

  'pubsub-vs-kafka-vs-kinesis': {
    title: 'Pub/Sub vs Kafka vs Kinesis — Choosing a Streaming Ingestion Layer',
    date: 'March 2, 2026', readTime: '6 min read',
    tags: ['GCP', 'Streaming', 'AWS'],
    intro: 'Every real-time data pipeline needs a message broker — a system that ingests high-velocity events and makes them available to downstream consumers. Google Pub/Sub, Apache Kafka, and Amazon Kinesis all do this job but with different tradeoffs.',
    sections: [
      { heading: 'Google Pub/Sub', body: `Pub/Sub is Google fully managed global message queue. Producers publish to topics. Subscribers receive messages via push (Pub/Sub calls your endpoint) or pull (your code polls).\\n\\nKey characteristic: at-least-once delivery. Messages may be delivered more than once — your consumer must handle duplicates. For exactly-once: use Dataflow with Pub/Sub source which handles deduplication.\\n\\nStrength: zero infrastructure management, global availability, integrates natively with all GCP services, automatic scaling to millions of messages per second.` },
      { heading: 'Apache Kafka', body: `Kafka is the industry standard for high-throughput event streaming. Unlike Pub/Sub and Kinesis, Kafka retains messages for configurable periods (days to weeks). Multiple consumer groups read the same topic independently.\\n\\nThis retention and replayability is Kafka's killer feature. A new analytics system can replay 30 days of events from Kafka without needing a separate archive.\\n\\nOn GCP: use Confluent Cloud (managed Kafka) or Google Cloud Managed Kafka. Self-managing Kafka is complex — use a managed service.` },
      { heading: 'Amazon Kinesis', body: `Kinesis is AWS's managed streaming service. Kinesis Data Streams retains messages for 24 hours to 365 days. Kinesis Firehose automatically delivers streams to S3, Redshift, or OpenSearch without writing consumer code.\\n\\nKinesis shards are the unit of throughput (1MB/s write, 2MB/s read per shard). You provision shards upfront — unlike Kafka and Pub/Sub which scale automatically.\\n\\nFor AWS-native stacks: Kinesis Firehose is the easiest way to get streaming data into S3 for downstream batch processing.` },
      { heading: 'How to choose', body: `GCP stack: Pub/Sub is the default. Add Kafka only if you need message retention and replay.\\nAWS stack: Kinesis for AWS-native integration. MSK (managed Kafka) for replay requirements or multi-cloud.\\nMulti-cloud or cloud-neutral: Kafka. Confluent Cloud runs on all three clouds with the same API.\\n\\nFor job market: Kafka knowledge is the most transferable. Pub/Sub and Kinesis are cloud-specific.` },
    ],
    cta: { label: 'Learn Google Pub/Sub', href: '/learn/gcp/pubsub' },
  },

  'gcp-iam-for-data-engineers': {
    title: 'GCP IAM for Data Engineers — Access Control Without the Confusion',
    date: 'February 28, 2026', readTime: '5 min read',
    tags: ['GCP', 'Security'],
    intro: 'GCP IAM (Identity and Access Management) confuses most newcomers because it looks similar to AWS IAM and Azure RBAC but works differently. Understanding how to grant the right access to the right resources is essential for building secure data pipelines on GCP.',
    sections: [
      { heading: 'The three concepts you need', body: `Member: who is getting access. Can be a Google account, service account, Google group, or domain.\\n\\nRole: what access is being granted. A role is a collection of permissions. predefined roles (roles/bigquery.dataEditor) bundle common permissions. Custom roles let you create exactly the permission set you need.\\n\\nBinding: the connection between member and role on a specific resource. Grant service account X the role roles/bigquery.dataEditor on dataset Y.` },
      { heading: 'Service accounts for pipelines', body: `Service accounts are the GCP equivalent of AWS IAM roles or Azure Service Principals. Your Dataflow jobs, Composer DAGs, and GCE instances use service accounts to authenticate to other GCP services.\\n\\nBest practice: create one service account per workload with only the permissions it needs. A Dataflow job that reads from Pub/Sub and writes to BigQuery needs:\\n- roles/pubsub.subscriber on the subscription\\n- roles/bigquery.dataEditor on the target dataset\\n- roles/bigquery.jobUser on the project\\n\\nNothing more. Principle of least privilege.` },
      { heading: 'Common data engineering role bindings', body: `BigQuery analyst (read only): roles/bigquery.dataViewer + roles/bigquery.jobUser\\nDataflow pipeline runner: roles/dataflow.developer + roles/bigquery.dataEditor + roles/storage.objectViewer\\nComposer DAG runner: roles/composer.worker + service-specific roles for each GCP service the DAGs call\\nGCS pipeline: roles/storage.objectCreator (write) + roles/storage.objectViewer (read)` },
      { heading: 'Workload Identity — the modern approach', body: `Workload Identity lets GKE workloads (including Composer and Dataflow) use service accounts without downloading key files. The workload authenticates using its Kubernetes service account, which is mapped to a GCP service account.\\n\\nThis eliminates the biggest security risk in GCP pipelines: service account JSON key files getting committed to Git or exposed in container images. Enable Workload Identity Federation on all new GCP data engineering projects.` },
    ],
    cta: { label: 'Start the GCP Data Engineering track', href: '/learn/gcp/introduction' },
  },

  'kinesis-firehose-explained': {
    title: 'Amazon Kinesis Firehose Explained — The Easiest Way to Stream Data into S3',
    date: 'February 26, 2026', readTime: '5 min read',
    tags: ['AWS', 'Streaming'],
    intro: 'Kinesis Data Firehose is the simplest streaming ingestion service in AWS. While Kinesis Data Streams requires you to write consumer code, Firehose automatically delivers streaming data to S3, Redshift, OpenSearch, or Splunk — no consumer code needed.',
    sections: [
      { heading: 'What Firehose does', body: `You point an application at a Firehose delivery stream. Firehose buffers the incoming records (by size or time — whichever threshold is hit first), optionally transforms them using a Lambda function, and delivers batches to your destination.\\n\\nFor S3 delivery: Firehose automatically creates date-partitioned prefix paths (year/month/day/hour), converting your stream into organized S3 files suitable for Athena or Glue queries.` },
      { heading: 'Firehose vs Kinesis Data Streams', body: `Kinesis Data Streams: you control consumers. Records are retained for 24h to 365 days. Multiple consumers read at their own pace. You write the consumer application.\\n\\nKinesis Firehose: no consumer code. Automatic delivery to a destination. No message retention — once delivered, it is gone. Simpler to set up but less flexible.\\n\\nChoose Firehose when: you want to get streaming data into S3 quickly without building consumer infrastructure. Choose Data Streams when: multiple downstream systems need to consume the same stream independently.` },
      { heading: 'Data transformation with Lambda', body: `Firehose can invoke a Lambda function on each batch before delivery. This is where you add: data format conversion (JSON to Parquet — reduces S3 storage 5-10x), schema validation (drop malformed records), PII redaction (mask credit card numbers before S3).\\n\\nThe Lambda receives up to 3MB of records per invocation, transforms them, and returns the modified records. Firehose handles the rest.` },
      { heading: 'Real-world use case', body: `Application servers emit clickstream events → Kinesis Firehose → S3 (partitioned by date/hour) → AWS Glue catalog → Athena queries by analysts.\\n\\nThis pattern requires zero consumer code, produces queryable S3 data in minutes, and costs a fraction of running a Kafka cluster. For AWS-native event collection to S3, Firehose is the default first choice.` },
    ],
    cta: { label: 'Learn Amazon Kinesis', href: '/learn/aws/kinesis' },
  },

  'redshift-best-practices': {
    title: 'Amazon Redshift Best Practices — Distribution Keys, Sort Keys, and Vacuum',
    date: 'February 25, 2026', readTime: '7 min read',
    tags: ['AWS', 'Storage'],
    intro: 'A poorly configured Redshift cluster can be 100x slower than a well-configured one for the same query. The three most impactful configuration decisions — distribution keys, sort keys, and vacuum strategy — are what separate a performant Redshift cluster from an expensive slow one.',
    sections: [
      { heading: 'Distribution keys — how data splits across nodes', body: `Redshift distributes table rows across compute nodes. The distribution key determines which node each row goes to.\\n\\nKEY distribution: rows with the same distribution key value go to the same node. Use this on join columns — if orders and customers both distribute by customer_id, joins between them require no network transfer.\\n\\nEVEN distribution: rows distributed round-robin. Good for tables with no dominant join pattern.\\n\\nALL distribution: full copy on every node. Use for small dimension tables (under a few million rows) that join frequently with large fact tables.` },
      { heading: 'Sort keys — how data is ordered on disk', body: `Sort keys determine the physical order of rows within each data block. Queries with range filters (WHERE event_date BETWEEN x AND y) skip entire blocks that fall outside the range.\\n\\nSingle sort key: one column. Use when queries consistently filter on one column (usually a date).\\n\\nCompound sort key: multiple columns ordered left to right. WHERE date = x AND region = y benefits from a compound sort key on (date, region). The leftmost column is most important.\\n\\nInterleaved sort key: equal weight to all key columns. Better for varied query patterns but slower on VACUUM. Use sparingly.` },
      { heading: 'VACUUM and ANALYZE', body: `When rows are deleted or updated in Redshift, they are not removed immediately — they are marked as deleted and new versions are written. Over time this creates table bloat.\\n\\nVACUUM reclaims disk space and re-sorts unsorted rows. Run VACUUM on high-churn tables weekly or after large loads.\\n\\nANALYZE updates table statistics used by the query planner. Run after significant data changes. Without current statistics, Redshift may choose inefficient join order or scan strategy.\\n\\nBoth VACUUM and ANALYZE can run automatically — enable auto VACUUM and auto ANALYZE in cluster settings.` },
      { heading: 'WLM — Workload Management', body: `WLM controls how queries are queued and prioritized. By default all queries share one queue. This means an analyst running a 10-minute report blocks a 1-second dashboard query.\\n\\nConfigure WLM with at least two queues: a fast queue for short queries with a short timeout, and a slow queue for long-running ETL jobs. Route queries automatically by user group or query group label.` },
    ],
    cta: { label: 'Learn Amazon Redshift', href: '/learn/aws/redshift' },
  },

  'aws-s3-for-data-engineers': {
    title: 'Amazon S3 for Data Engineers — Beyond Just File Storage',
    date: 'February 24, 2026', readTime: '6 min read',
    tags: ['AWS', 'Storage'],
    intro: 'Most data engineers use S3 as a file system — upload files, download files. But S3 has a rich set of features specifically useful for data engineering that most engineers never learn: lifecycle policies, event notifications, S3 Select, Requester Pays, and Intelligent Tiering.',
    sections: [
      { heading: 'S3 storage classes and lifecycle policies', body: `S3 has multiple storage classes with different cost and retrieval speed tradeoffs:\\n\\nS3 Standard: hot data, frequent access, highest cost\\nS3 Standard-IA (Infrequent Access): data accessed monthly, 40% cheaper than Standard\\nS3 Glacier Instant Retrieval: archive data accessed quarterly, 68% cheaper\\nS3 Glacier Deep Archive: long-term archive, lowest cost, 12-hour retrieval\\n\\nLifecycle policies automatically transition objects between classes based on age. Bronze layer data older than 90 days → Standard-IA. Older than 365 days → Glacier. This runs automatically with no code required.` },
      { heading: 'S3 event notifications for pipeline triggers', body: `S3 can trigger Lambda functions, SQS queues, or SNS topics when objects are created, deleted, or restored.\\n\\nCommon pattern: a source system drops a CSV file in S3 → S3 event triggers a Lambda → Lambda starts a Glue job to process the file → Glue writes Parquet to processed/ prefix.\\n\\nThis creates an event-driven pipeline that runs automatically when new data arrives — no polling, no scheduler, no wasted compute waiting for files.` },
      { heading: 'S3 Select — query without downloading', body: `S3 Select lets you run SQL-like queries against individual S3 objects and return only the matching rows — without downloading the entire file.\\n\\nFor a 10GB CSV file: SELECT * WHERE region = US returns only US rows, transferring perhaps 500MB instead of 10GB.\\n\\nUseful for: quick data inspection, lightweight filtering before full processing, and reducing Lambda function memory requirements when processing large files.` },
      { heading: 'Partitioning strategy for S3 data lakes', body: `S3 objects are accessed by prefix (folder-like path). Athena, Glue, and Spark all prune partitions based on S3 prefixes.\\n\\nOptimal partition structure for most data engineering use cases:\\ns3://bucket/table-name/year=2026/month=03/day=15/\\n\\nHive-style partitioning (key=value format) is recognized automatically by Glue catalog, Athena, and Spark. This enables predicate pushdown — only partitions matching your WHERE clause are read.` },
    ],
    cta: { label: 'Learn Amazon S3 in depth', href: '/learn/aws/s3' },
  },

  'data-engineering-career-path': {
    title: 'The Data Engineering Career Path — Junior to Senior in 3 Years',
    date: 'February 23, 2026', readTime: '8 min read',
    tags: ['Career'],
    intro: 'Data engineering is one of the highest-paying entry points in the technology industry. But the path from zero experience to a senior role is not linear — and most guides miss the specific skills and milestones that actually matter to hiring managers at each level.',
    sections: [
      { heading: 'Year 0 to 1 — Getting the first job', body: `The first job is the hardest. Employers want experience, but you need a job to get experience. The way out: build a project that demonstrates you can do the actual work.\\n\\nThe minimum viable portfolio for a junior DE role:\\n1. One end-to-end pipeline project on a cloud platform (Azure or AWS)\\n2. SQL skills demonstrated through complex query samples\\n3. Python data transformation scripts on GitHub\\n4. Basic understanding of the Medallion Architecture\\n\\nYou do not need a degree in computer science or prior software engineering experience. The portfolio is the proof.` },
      { heading: 'Year 1 to 2 — Junior to mid-level', body: `In your first year, focus on depth over breadth. Become genuinely good at one cloud platform's core services rather than superficially familiar with everything.\\n\\nSkills that unlock mid-level titles:\\n- Owning a production pipeline end to end (not just writing code but monitoring, alerting, and fixing it)\\n- Data quality framework implementation\\n- Pipeline performance optimization (you have made something meaningfully faster)\\n- Mentoring an intern or junior colleague\\n\\nThe mid-level jump usually comes at 18-24 months if you are actively taking on more responsibility.` },
      { heading: 'Year 2 to 3 — Mid to senior', body: `Senior data engineers are defined less by technical skill and more by scope of impact. A senior DE:\\n\\n- Designs systems that other engineers implement\\n- Makes architectural decisions with multi-year implications\\n- Identifies problems before they become incidents\\n- Communicates technical tradeoffs to non-technical stakeholders\\n\\nTechnical markers of senior readiness: you have migrated a production system to a new architecture, you have led incident response on a data outage, you have designed a data model that serves multiple teams.` },
      { heading: 'Salary progression in the US (2026)', body: `Entry level / Junior (0-2 years): $80,000 - $110,000\\nMid-level (2-4 years): $110,000 - $140,000\\nSenior (4-7 years): $140,000 - $180,000\\nStaff / Principal (7+ years): $180,000 - $250,000+\\n\\nThese are US consulting and mid-size tech company figures. FAANG pays 30-50% more at each level. H1B-sponsored consulting firm roles start at the lower end of these ranges.\\n\\nThe fastest salary growth happens at the junior to mid jump — going from $90K to $130K is common in the first three years for high performers.` },
    ],
    cta: { label: 'See which companies are hiring and sponsoring H1B', href: '/learn/industry' },
  },

  'what-is-dbt': {
    title: 'What Is dbt? The Data Transformation Tool Everyone Is Talking About',
    date: 'February 20, 2026', readTime: '6 min read',
    tags: ['Foundations', 'Architecture'],
    intro: 'dbt (data build tool) has become one of the most-mentioned tools in analytics engineering job descriptions in the past two years. If you are seeing it everywhere and not sure what it does or whether to learn it, this is the plain-English explanation.',
    sections: [
      { heading: 'What dbt actually does', body: `dbt transforms data that is already in your data warehouse or data lake. It does not extract data from sources or load it — that is handled by ADF, Glue, Fivetran, or your ingestion pipeline. dbt only does the T in ELT.\\n\\nYou write SQL SELECT statements in .sql files. dbt compiles them into the correct SQL dialect for your warehouse and runs them. Each .sql file becomes a table or view in your warehouse.\\n\\ndbt adds: dependency management between models, testing on data quality, documentation, and version control for SQL transformations.` },
      { heading: 'Why it became popular', body: `Before dbt, SQL transformations were managed as stored procedures, scripts, or Spark notebooks. They had no tests, no documentation, no lineage, and no consistent structure.\\n\\ndbt brings software engineering practices to SQL. You can see the full lineage of a model (what it depends on, what depends on it), run tests to catch data quality issues, and generate automatically updated documentation.\\n\\nFor analytics engineers who work primarily in SQL: dbt is transformative. For data engineers building heavy Spark pipelines: dbt is a useful complement for the SQL serving layer.` },
      { heading: 'dbt Core vs dbt Cloud', body: `dbt Core is the open-source CLI tool — free, runs locally or on any server, integrates with any orchestrator.\\n\\ndbt Cloud is the managed SaaS product — adds a web IDE, managed scheduler, CI/CD integration, and enhanced documentation. Costs money but removes infrastructure management.\\n\\nFor learning: start with dbt Core locally against a free BigQuery or Snowflake account. For production: most companies use dbt Cloud for the managed scheduler and IDE.` },
      { heading: 'Should you learn dbt in 2026?', body: `If you are targeting analytics engineering roles: yes, immediately. dbt is listed in nearly every analytics engineer job description.\\n\\nIf you are targeting data engineering roles: understand it conceptually. Know what it does and when to use it. You will encounter dbt in most modern data stacks even if you are not writing dbt models yourself.\\n\\nFor the resume: listing dbt signals you understand the modern ELT stack and the separation of ingestion, transformation, and serving layers.` },
    ],
    cta: { label: 'Understand the full modern data stack in the Roadmap', href: '/learn/roadmap' },
  },

  'incremental-loading-explained': {
    title: 'Incremental Loading — How to Process Only New Data in Your Pipelines',
    date: 'February 18, 2026', readTime: '6 min read',
    tags: ['Architecture', 'Foundations'],
    intro: 'Loading all data from scratch every pipeline run is safe but slow and expensive. Incremental loading — processing only new or changed records since the last run — is what makes production pipelines fast enough to run every hour instead of once a day.',
    sections: [
      { heading: 'Full load vs incremental load', body: `Full load: truncate the target table, reload everything from source. Safe — always produces correct results. But for a table with 5 years of data, you reprocess everything every run. At scale this becomes impractical.\\n\\nIncremental load: identify records that are new or changed since the last run, process only those, and merge them into the target. Faster, cheaper, but requires careful implementation to avoid missing data or creating duplicates.` },
      { heading: 'Watermark-based incremental loading', body: `The most common approach: track the maximum value of a timestamp column (updated_at, created_at) from the last successful run. On the next run, read only records where updated_at > last_watermark.\\n\\nStore the watermark in a metadata table after each successful run. If the pipeline fails, the watermark is not updated — the next run reprocesses the same window, catching any missed records.\\n\\nThis is the pattern used in ADF Copy Activity with incremental watermark, Glue bookmarks, and custom PySpark incremental pipelines.` },
      { heading: 'Handling late-arriving and updated records', body: `Watermark-based loading misses records that arrive late (after the watermark has already passed) and records that are updated (updated_at changes but the record was already loaded).\\n\\nFor updates: use MERGE (upsert) instead of INSERT when writing to Silver or Gold. MERGE matches on primary key — if the record exists, update it; if not, insert it. Delta Lake MERGE, Synapse MERGE, and BigQuery MERGE all work this way.\\n\\nFor late arrivals: add a processing window buffer. Instead of loading records where updated_at > last_watermark, load where updated_at > last_watermark - 2 hours. This catches late arrivals at the cost of some reprocessing.` },
      { heading: 'Change Data Capture (CDC)', body: `CDC is the most sophisticated form of incremental loading. Instead of querying the source table, you capture every INSERT, UPDATE, and DELETE operation from the source database transaction log.\\n\\nTools: Debezium (open source), AWS DMS, Azure Data Factory Data Flow with CDC support.\\n\\nCDC gives you exact change history — not just the current state of changed records but every intermediate state. Essential for audit requirements, slowly changing dimensions, and low-latency replication.` },
    ],
    cta: { label: 'See incremental loading in Project 1', href: '/learn/projects/azure-batch-pipeline' },
  },

  'batch-vs-streaming': {
    title: 'Batch vs. Streaming — The Decision Framework Every Data Engineer Needs',
    date: 'January 25, 2026', readTime: '6 min read',
    tags: ['Architecture', 'Batch', 'Streaming'],
    intro: 'Most data engineering architecture decisions come down to one question: batch or streaming? Get this wrong and you build an overly complex streaming system when a simple batch job would have worked fine — or you build a batch pipeline that cannot meet the business latency requirement.',
    sections: [
      { heading: 'The core difference', body: `Batch processing collects data over a period of time and processes it all at once on a schedule. Run at 2am, process all of yesterday's data, write results, done.\n\nStream processing processes data continuously as it arrives, event by event, with latency measured in milliseconds to seconds.\n\nThe key insight: streaming is not always better. It is more complex, more expensive, and harder to debug. You should only use streaming when the business genuinely requires low latency.` },
      { heading: 'The decision framework — ask these 4 questions', body: `1. What is the required latency?\n   - Hours or days: batch is fine\n   - Minutes: micro-batch (Spark Structured Streaming with short windows)\n   - Seconds or milliseconds: true streaming required\n\n2. What is the data volume?\n   - High volume, low frequency: batch wins\n   - Low volume, high frequency: streaming is manageable\n   - High volume, high frequency: streaming is expensive — challenge the business requirement\n\n3. How complex is the transformation?\n   - Simple aggregations: both work\n   - Joins across multiple streams: streaming becomes very complex, consider if batch solves the problem\n\n4. What happens if you are 1 hour late?\n   - Business critical: streaming\n   - Reporting and analytics: batch is almost always fine` },
      { heading: 'Real examples of each', body: `Clear batch use cases:\n- Daily sales reporting (nobody needs this at 3am with 10ms latency)\n- Monthly customer churn analysis\n- Weekly ETL from operational databases to data warehouse\n- End-of-day financial reconciliation\n\nClear streaming use cases:\n- Fraud detection on credit card transactions (must decide in milliseconds)\n- Real-time inventory tracking during flash sales\n- Live sports scores and statistics\n- Industrial sensor monitoring for equipment failure` },
      { heading: 'What most companies actually use', body: `The honest reality: about 80% of data engineering work in most companies is batch processing. Streaming gets a lot of attention at conferences but the majority of pipelines that run in production at real companies — especially mid-size companies — are scheduled batch jobs.\n\nLearn batch deeply first. Understand streaming conceptually. Build streaming knowledge once you have your first job and face a real streaming requirement.\n\nFor interviews: be able to explain the tradeoffs clearly. Most interviewers ask about streaming to test your judgment — they want to know if you would reach for streaming unnecessarily, not whether you can implement Kafka.` },
    ],
    cta: { label: 'See batch processing in action — Project 1', href: '/learn/projects/azure-batch-pipeline' },
  },
}

export async function generateStaticParams() {
  return Object.keys(ARTICLES).map(slug => ({ slug }))
}

const tagColors: Record<string, string> = {
  'Architecture': '#7b61ff', 'Data Lake': '#00c2ff', 'Azure': '#0078d4',
  'AWS': '#ff9900', 'GCP': '#4285f4', 'Delta Lake': '#ff6b6b',
  'Apache Iceberg': '#00c2ff', 'Open Table Format': '#00e676',
  'Career': '#f5c542', 'Resume': '#f5c542', 'H1B': '#f5c542',
  'ADF': '#0078d4', 'Airflow': '#00e676', 'Orchestration': '#7b61ff',
  'Microsoft Fabric': '#0078d4', 'Batch': '#00c2ff', 'Streaming': '#00e676',
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const article = ARTICLES[params.slug]
  if (!article) notFound()

  return (
    <div className="pt-16 min-h-screen" style={{ background: 'var(--bg)' }}>
      <div className="border-b py-12 px-4" style={{ borderColor: 'var(--border)', background: 'var(--bg2)' }}>
        <div className="max-w-3xl mx-auto">
          <Link href="/blog" className="flex items-center gap-1.5 text-xs font-mono mb-6 hover:underline"
            style={{ color: 'var(--accent)' }}>
            <ChevronLeft size={12} /> Back to Blog
          </Link>
          <div className="flex flex-wrap gap-1.5 mb-4">
            {article.tags.map(tag => (
              <span key={tag} className="text-xs font-mono px-2 py-0.5 rounded"
                style={{ background: `${tagColors[tag] || '#00c2ff'}15`, color: tagColors[tag] || '#00c2ff' }}>
                {tag}
              </span>
            ))}
          </div>
          <h1 className="font-display font-extrabold leading-tight tracking-tight mb-4"
            style={{ fontSize: 'clamp(1.75rem,4vw,2.75rem)', color: 'var(--text)' }}>
            {article.title}
          </h1>
          <div className="flex items-center gap-4 text-xs font-mono flex-wrap" style={{ color: 'var(--muted)' }}>
            <span className="flex items-center gap-1"><Calendar size={10} /> {article.date}</span>
            <span className="flex items-center gap-1"><Clock size={10} /> {article.readTime}</span>
            <span className="flex items-center gap-1">
              ✍️ by{' '}
              <span style={{
                background: 'linear-gradient(135deg, #F59E0B, #FCD34D)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                fontWeight: 700,
              }}>Asil</span>
            </span>
            <PageViews slug={'/blog/' + params.slug} />
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-12">
        <p className="text-lg leading-relaxed mb-10"
          style={{ color: 'var(--text2)', fontFamily: 'Lora, serif', fontStyle: 'italic', borderLeft: '3px solid var(--accent)', paddingLeft: '1.25rem' }}>
          {article.intro}
        </p>

        <div className="space-y-10">
          {article.sections.map((section, i) => (
            <section key={i}>
              <h2 className="font-display font-bold text-xl mb-4" style={{ color: 'var(--text)' }}>
                {section.heading}
              </h2>
              <div className="space-y-3">
                {section.body.split(/\\n\\n|\\n|\n\n|\n/).filter(p => p.trim()).map((para, j) => (
                  <p key={j} className="text-base leading-relaxed"
                    style={{ color: 'var(--text2)', fontFamily: 'Lora, serif', whiteSpace: 'pre-line' }}>
                    {para}
                  </p>
                ))}
              </div>
            </section>
          ))}
        </div>

        <div className="mt-14 rounded-2xl p-8 text-center"
          style={{ background: 'var(--accent-glow)', border: '1px solid rgba(0,120,212,0.15)' }}>
          <h2 className="font-display font-bold text-xl mb-3" style={{ color: 'var(--text)' }}>Ready to apply this?</h2>
          <Link href={article.cta.href} className="btn-primary">
            {article.cta.label} <ArrowRight size={14} />
          </Link>
        </div>

        <div className="mt-10 pt-8 text-center" style={{ borderTop: '1px solid var(--border)' }}>
          <Link href="/blog" className="btn-secondary"><ChevronLeft size={14} /> Back to all articles</Link>
        </div>
      </div>
    </div>
  )
}