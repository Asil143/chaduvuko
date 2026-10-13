import type { TrackCheatSheet } from '@/lib/cheatsheet'

export const awsCheatSheet: TrackCheatSheet = {
  track: 'aws',
  title: 'AWS',
  trackHref: '/learn/aws/introduction',
  accent: '#ff9900',
  blurb: 'IAM, S3, Glue, EMR, Athena, Redshift, Kinesis, Step Functions and Lake Formation — the AWS data track on one page. Bookmark it.',
  sections: [
    {
      title: 'Account & IAM',
      entries: [
        {
          label: 'Who am I, which region',
          note: 'stay in the dev account',
          code: `aws sts get-caller-identity
aws configure set region us-east-1
# Account, Arn, UserId — lake, catalog, and warehouse share this region`,
        },
        {
          label: 'Trust policy',
          note: 'who can assume the role',
          code: `{
  "Version": "2012-10-17",
  "Statement": [{
    "Effect": "Allow",
    "Principal": {"Service": "glue.amazonaws.com"},
    "Action": "sts:AssumeRole"
  }]
}`,
        },
        {
          label: 'Least privilege on the lake',
          code: `{
  "Version": "2012-10-17",
  "Statement": [
    {"Effect": "Allow", "Action": ["s3:ListBucket"],
     "Resource": "arn:aws:s3:::acme-lake-dev"},
    {"Effect": "Allow", "Action": ["s3:GetObject"],
     "Resource": "arn:aws:s3:::acme-lake-dev/bronze/*"},
    {"Effect": "Allow", "Action": ["s3:PutObject"],
     "Resource": "arn:aws:s3:::acme-lake-dev/silver/*"}
  ]
}`,
        },
        {
          label: 'Create the role',
          note: 'no long-lived access keys',
          code: `aws iam create-role --role-name glue-etl --assume-role-policy-document file://trust-glue.json
aws iam put-role-policy --role-name glue-etl --policy-name lake-rw --policy-document file://lake-rw.json
# Glue, EMR, and Step Functions assume a role. Do not paste keys into a job.`,
        },
      ],
    },
    {
      title: 'Amazon S3',
      entries: [
        {
          label: 'Bucket and first file',
          code: `aws s3 mb s3://acme-lake-dev --region us-east-1
aws s3 cp orders.csv s3://acme-lake-dev/bronze/orders/dt=2026-03-15/orders.csv`,
        },
        {
          label: 'Medallion prefixes',
          note: 'partition key in the path',
          code: `s3://acme-lake-dev/bronze/orders/dt=2026-03-15/part-000.parquet
s3://acme-lake-dev/silver/orders/dt=2026-03-15/
s3://acme-lake-dev/gold/daily_revenue/
# Athena and Glue skip prefixes the query did not ask for`,
        },
        {
          label: 'Lock the bucket down',
          code: `aws s3api put-bucket-versioning --bucket acme-lake-dev --versioning-configuration Status=Enabled
aws s3api put-public-access-block --bucket acme-lake-dev --public-access-block-configuration '{"BlockPublicAcls":true,"IgnorePublicAcls":true,"BlockPublicPolicy":true,"RestrictPublicBuckets":true}'`,
        },
        {
          label: 'Lifecycle on bronze',
          code: `aws s3api put-bucket-lifecycle-configuration --bucket acme-lake-dev --lifecycle-configuration '{"Rules":[{"ID":"bronze-to-ia","Status":"Enabled","Filter":{"Prefix":"bronze/"},"Transitions":[{"Days":30,"StorageClass":"STANDARD_IA"}]}]}'`,
        },
      ],
    },
    {
      title: 'AWS Glue',
      entries: [
        {
          label: 'Database',
          note: 'the catalog, not the data',
          code: `aws glue create-database --database-input '{"Name":"lake"}'
aws glue get-tables --database-name lake`,
        },
        {
          label: 'Crawler over bronze',
          code: `aws glue create-crawler --name orders-bronze --role arn:aws:iam::123456789012:role/glue-etl --database-name lake --targets '{"S3Targets":[{"Path":"s3://acme-lake-dev/bronze/orders/"}]}'
aws glue start-crawler --name orders-bronze`,
        },
        {
          label: 'Start a job',
          note: 'bookmark skips files already read',
          code: `aws glue start-job-run --job-name bronze-to-silver-orders --arguments '{"--dt":"2026-03-15","--job-bookmark-option":"job-bookmark-enable"}'
aws glue get-job-run --job-name bronze-to-silver-orders --run-id jr_example`,
        },
        {
          label: 'Read the catalog',
          code: `dyf = glueContext.create_dynamic_frame.from_catalog(
    database="lake", table_name="orders")
dyf.toDF().createOrReplaceTempView("orders")`,
        },
      ],
    },
    {
      title: 'Amazon EMR',
      entries: [
        {
          label: 'Transient Spark cluster',
          note: 'heavier than a Glue job',
          code: `aws emr create-cluster --name spark-orders --release-label emr-7.2.0 --applications Name=Spark --instance-type m5.xlarge --instance-count 3 --use-default-roles
# shut it down when the step finishes — an idle cluster still bills`,
        },
        {
          label: 'Spark step',
          code: `aws emr add-steps --cluster-id j-ABC123 --steps '[{"Type":"Spark","Name":"silver-orders","ActionOnFailure":"CONTINUE","Args":["s3://acme-lake-dev/jobs/silver_orders.py","--dt","2026-03-15"]}]'`,
        },
        {
          label: 'See it, then stop it',
          code: `aws emr list-clusters --active
aws emr describe-cluster --cluster-id j-ABC123 --query 'Cluster.Status.State'
aws emr terminate-clusters --cluster-ids j-ABC123`,
        },
      ],
    },
    {
      title: 'Amazon Athena',
      entries: [
        {
          label: 'External Parquet table',
          note: 'metadata only — files stay in S3',
          code: `CREATE EXTERNAL TABLE lake.orders (
  order_id string,
  amount double
)
PARTITIONED BY (dt string)
STORED AS PARQUET
LOCATION 's3://acme-lake-dev/silver/orders/';`,
        },
        {
          label: 'Register one partition',
          code: `ALTER TABLE lake.orders ADD IF NOT EXISTS
  PARTITION (dt = '2026-03-15')
  LOCATION 's3://acme-lake-dev/silver/orders/dt=2026-03-15/';
-- MSCK REPAIR TABLE lake.orders;  -- walks every prefix; slower`,
        },
        {
          label: 'Filter the partition',
          code: `SELECT dt, SUM(amount) AS revenue
FROM lake.orders
WHERE dt = '2026-03-15'
GROUP BY dt;
-- without dt, Athena scans every prefix under the table`,
        },
        {
          label: 'Iceberg table',
          code: `CREATE TABLE lake.orders_iceberg (
  order_id string,
  amount double,
  dt date
)
PARTITIONED BY (dt)
LOCATION 's3://acme-lake-dev/iceberg/orders/'
TBLPROPERTIES ('table_type' = 'ICEBERG');`,
        },
      ],
    },
    {
      title: 'Amazon Redshift',
      entries: [
        {
          label: 'Dist key and sort key',
          code: `CREATE TABLE gold.orders (
  order_id varchar(32) NOT NULL,
  dt date NOT NULL,
  amount decimal(12, 2)
)
DISTKEY (order_id)
SORTKEY (dt);`,
        },
        {
          label: 'COPY from S3',
          note: 'the cluster role, not your user keys',
          code: `COPY gold.orders
FROM 's3://acme-lake-dev/gold/orders/'
IAM_ROLE 'arn:aws:iam::123456789012:role/redshift-copy'
FORMAT AS PARQUET;`,
        },
        {
          label: 'Spectrum over the Glue catalog',
          code: `CREATE EXTERNAL SCHEMA spectrum_lake
FROM DATA CATALOG
DATABASE 'lake'
IAM_ROLE 'arn:aws:iam::123456789012:role/redshift-copy'
CREATE EXTERNAL DATABASE IF NOT EXISTS;`,
        },
        {
          label: 'Join lake and warehouse',
          code: `SELECT o.order_id, g.amount
FROM spectrum_lake.orders o
JOIN gold.orders g ON g.order_id = o.order_id
WHERE o.dt = '2026-03-15';`,
        },
      ],
    },
    {
      title: 'Amazon Kinesis',
      entries: [
        {
          label: 'On-demand stream',
          code: `aws kinesis create-stream --stream-name orders --stream-mode-details StreamMode=ON_DEMAND
aws kinesis describe-stream-summary --stream-name orders`,
        },
        {
          label: 'Put one event',
          note: 'key chooses the shard',
          code: `aws kinesis put-record --stream-name orders --partition-key order-1042 --cli-binary-format raw-in-base64-out --data '{"order_id":"1042","amount":19.5}'
# high-cardinality key (order id), not the date — a date piles onto one shard`,
        },
        {
          label: 'Firehose into the lake',
          code: `aws firehose create-delivery-stream --delivery-stream-name orders-to-s3 --delivery-stream-type DirectPut --s3-destination-configuration '{"RoleARN":"arn:aws:iam::123456789012:role/firehose-s3","BucketARN":"arn:aws:s3:::acme-lake-dev","Prefix":"bronze/kinesis/orders/","ErrorOutputPrefix":"bronze/kinesis/errors/"}'`,
        },
      ],
    },
    {
      title: 'Step Functions',
      entries: [
        {
          label: 'Wait for a Glue job',
          code: `{
  "StartAt": "Silver",
  "States": {
    "Silver": {
      "Type": "Task",
      "Resource": "arn:aws:states:::glue:startJobRun.sync",
      "Parameters": {"JobName": "bronze-to-silver-orders"},
      "Next": "Done"
    },
    "Done": {"Type": "Succeed"}
  }
}`,
        },
        {
          label: 'Start an execution',
          code: `aws stepfunctions start-execution --state-machine-arn arn:aws:states:us-east-1:123456789012:stateMachine:nightly-lake --input '{"dt":"2026-03-15"}'
aws stepfunctions describe-execution --execution-arn arn:aws:states:us-east-1:123456789012:execution:nightly-lake:example`,
        },
        {
          label: 'Retry, then fail',
          code: `"Retry": [{
  "ErrorEquals": ["States.TaskFailed"],
  "IntervalSeconds": 30,
  "MaxAttempts": 3,
  "BackoffRate": 2
}],
"Catch": [{
  "ErrorEquals": ["States.ALL"],
  "Next": "NotifyFailure"
}]`,
        },
      ],
    },
    {
      title: 'Lake Formation',
      entries: [
        {
          label: 'Register the bucket',
          code: `aws lakeformation register-resource --resource-arn arn:aws:s3:::acme-lake-dev --use-service-linked-role`,
        },
        {
          label: 'Tag, then attach',
          note: 'new tables inherit the tag',
          code: `aws lakeformation create-lf-tag --tag-key sensitivity --tag-values public,restricted
aws lakeformation add-lf-tags-to-resource --resource '{"Table":{"DatabaseName":"lake","Name":"orders"}}' --lf-tags TagKey=sensitivity,TagValues=public`,
        },
        {
          label: 'Grant by tag',
          code: `aws lakeformation grant-permissions --principal DataLakePrincipalIdentifier=arn:aws:iam::123456789012:role/analyst --resource '{"LFTagPolicy":{"ResourceType":"TABLE","CatalogId":"123456789012","Expression":[{"TagKey":"sensitivity","TagValues":["public"]}]}}' --permissions SELECT`,
        },
        {
          label: 'What can this role see',
          code: `aws lakeformation list-permissions --principal DataLakePrincipalIdentifier=arn:aws:iam::123456789012:role/analyst`,
        },
      ],
    },
  ],
  projects: [
    {
      title: 'Partitioned orders lake',
      level: 'Beginner',
      build: 'Land one day of orders as Parquet under bronze/orders/dt=YYYY-MM-DD/, crawl that prefix with Glue, and query only that day in Athena. Block public access on the bucket before the file goes up.',
      skills: ['S3 prefixes', 'public access block', 'Glue crawler', 'Athena partitions'],
    },
    {
      title: 'Glue role, not keys',
      level: 'Beginner',
      build: 'Create a role Glue can assume that reads bronze and writes silver, then run a small job with it. The script and the job arguments contain no access keys.',
      skills: ['IAM trust policy', 'least privilege', 'Glue jobs'],
    },
    {
      title: 'Nightly medallion',
      level: 'Intermediate',
      build: 'A Step Functions state machine runs a bookmarked Glue job from bronze to silver, then a second job that writes gold, with retry and a failure state. Athena reads one date from gold.',
      skills: ['Step Functions', 'Glue bookmarks', 'S3 layout', 'Athena'],
    },
    {
      title: 'Clickstream to the lake',
      level: 'Intermediate',
      build: 'Put order events on a Kinesis data stream, deliver them to a dated S3 prefix with Firehose, and query the landed files in Athena. The partition key is an order id, not the calendar day.',
      skills: ['Kinesis Data Streams', 'Firehose', 'S3', 'Athena'],
    },
    {
      title: 'Governed warehouse',
      level: 'Advanced',
      build: 'Register the lake in Lake Formation, tag tables by sensitivity, and grant an analyst SELECT only on public tables. Redshift Spectrum reads those Glue tables, and a transient EMR step runs one heavy join the warehouse should not.',
      skills: ['Lake Formation', 'LF-tags', 'Redshift Spectrum', 'EMR'],
    },
  ],
}
