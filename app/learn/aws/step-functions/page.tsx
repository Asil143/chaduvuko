import { LearnLayout } from '@/components/content/LearnLayout'
import { Callout } from '@/components/content/Callout'
import { CodeBlock } from '@/components/content/CodeBlock'
import { KeyTakeaways } from '@/components/content/KeyTakeaways'

export const metadata = { title: 'AWS Step Functions' }

const stateMachineCode = `// Step Functions State Machine — defined in Amazon States Language (ASL)
// This pipeline: validate file → run Glue job → check quality → notify

{
  "Comment": "Daily Sales Data Pipeline",
  "StartAt": "ValidateInputFile",
  "States": {

    "ValidateInputFile": {
      "Type": "Task",
      "Resource": "arn:aws:lambda:us-east-1:123456:function:ValidateS3File",
      "Parameters": {
        "bucket.$": "$.bucket",
        "key.$":    "$.key"
      },
      "Next": "RunGlueTransform",
      "Catch": [{
        "ErrorEquals": ["FileNotFoundError"],
        "Next":        "NotifyFailure"
      }]
    },

    "RunGlueTransform": {
      "Type": "Task",
      "Resource": "arn:aws:states:::glue:startJobRun.sync",   // .sync = wait for completion
      "Parameters": {
        "JobName": "sales-bronze-to-silver",
        "Arguments": {
          "--run_date.$": "$.run_date",
          "--input_path.$": "$.input_path"
        }
      },
      "Next": "CheckDataQuality",
      "Retry": [{
        "ErrorEquals": ["Glue.AWSGlueException"],
        "IntervalSeconds": 60,
        "MaxAttempts": 2,
        "BackoffRate": 2
      }]
    },

    "CheckDataQuality": {
      "Type": "Task",
      "Resource": "arn:aws:lambda:us-east-1:123456:function:CheckDataQuality",
      "Next": "QualityPassed?"
    },

    "QualityPassed?": {
      "Type": "Choice",
      "Choices": [{
        "Variable": "$.quality_score",
        "NumericGreaterThan": 0.95,
        "Next": "RunGoldAggregation"
      }],
      "Default": "NotifyQualityFailure"
    },

    "RunGoldAggregation": {
      "Type": "Task",
      "Resource": "arn:aws:states:::athena:startQueryExecution.sync",
      "Parameters": {
        "QueryString": "INSERT INTO gold_daily_revenue SELECT ...",
        "WorkGroup":   "pipeline-workgroup"
      },
      "Next": "NotifySuccess"
    },

    "NotifySuccess": {
      "Type": "Task",
      "Resource": "arn:aws:states:::sns:publish",
      "Parameters": {
        "TopicArn": "arn:aws:sns:us-east-1:123456:pipeline-alerts",
        "Message":  "Daily sales pipeline completed successfully"
      },
      "End": true
    },

    "NotifyFailure": {
      "Type": "Task",
      "Resource": "arn:aws:states:::sns:publish",
      "Parameters": {
        "TopicArn": "arn:aws:sns:us-east-1:123456:pipeline-alerts",
        "Message.$": "States.Format('Pipeline failed: {}', $.error)"
      },
      "End": true
    },

    "NotifyQualityFailure": {
      "Type": "Task",
      "Resource": "arn:aws:states:::sns:publish",
      "Parameters": {
        "TopicArn": "arn:aws:sns:us-east-1:123456:pipeline-alerts",
        "Message.$": "States.Format('Quality check failed. Score: {}', $.quality_score)"
      },
      "End": true
    }
  }
}`

const triggerCode = `# Trigger Step Functions execution from Python
import boto3
import json
from datetime import datetime

sf = boto3.client('stepfunctions', region_name='us-east-1')

# Start pipeline execution
response = sf.start_execution(
    stateMachineArn='arn:aws:states:us-east-1:123456:stateMachine:SalesPipeline',
    name=f"run-{datetime.utcnow().strftime('%Y%m%d-%H%M%S')}",  # unique execution name
    input=json.dumps({
        "run_date":   "2025-03-15",
        "bucket":     "your-data-bucket",
        "key":        "bronze/sales/2025/03/15/sales.csv",
        "input_path": "s3://your-data-bucket/bronze/sales/2025/03/15/"
    })
)

execution_arn = response['executionArn']
print(f"Started execution: {execution_arn}")

# Poll for completion (optional — Step Functions runs async)
import time
while True:
    status = sf.describe_execution(executionArn=execution_arn)
    if status['status'] in ('SUCCEEDED', 'FAILED', 'TIMED_OUT', 'ABORTED'):
        print(f"Execution {status['status']}")
        break
    print(f"Running... status: {status['status']}")
    time.sleep(10)`

const stateTypes = [
  { type: 'Task',     color: '#ff9900', desc: 'Calls an AWS service — Lambda, Glue, EMR, Athena, SNS, SQS, DynamoDB. The core building block. Use .sync suffix to wait for completion before moving on.' },
  { type: 'Choice',   color: '#0078d4', desc: 'Branches based on conditions — like an if/else. Inspect the state input ($.variable) and route to different states. No retry or catch on Choice states.' },
  { type: 'Parallel', color: '#7b61ff', desc: 'Run multiple branches simultaneously and wait for all to complete before continuing. Use for independent steps that do not depend on each other.' },
  { type: 'Map',      color: '#00c2ff', desc: 'Process an array of items in parallel — like forEach. Process 30 daily files simultaneously instead of one at a time.' },
  { type: 'Wait',     color: '#f5c542', desc: 'Pause execution for a fixed duration or until a timestamp. Useful for rate limiting and coordinating with external schedules.' },
  { type: 'Succeed / Fail', color: '#00e676', desc: 'Terminal states. Succeed ends the execution successfully. Fail ends with an error and custom message for debugging.' },
]

export default function StepFunctionsPage() {
  return (
    <LearnLayout
      title="AWS Step Functions"
      description="Step Functions is AWS serverless workflow orchestration. You define pipelines as state machines — visual, auditable, and automatically retried. Each step calls an AWS service: Lambda, Glue, Athena, EMR, or anything else in the AWS ecosystem."
      section="Section 03 · AWS Track"
      readTime="12 min read"
      updatedAt="March 2025"
      breadcrumbs={[
        { label: 'AWS Track', href: '/learn/aws/introduction' },
        { label: 'AWS Step Functions', href: '/learn/aws/step-functions' },
      ]}
      prev={{ title: 'Amazon EMR', href: '/learn/aws/emr' }}
      next={{ title: 'AWS Lake Formation', href: '/learn/aws/lake-formation' }}
    >
      <h2>What is AWS Step Functions?</h2>
      <p>
        Step Functions lets you coordinate multiple AWS services into a pipeline without writing the coordination logic in code. You define a state machine — a series of steps with branching, retries, and error handling — in JSON. AWS visualizes it, executes it, and records every step with full audit history.
      </p>
      <p>
        For data engineers, Step Functions is most useful for orchestrating pipelines where each step calls a different AWS service: Lambda for validation, Glue for transformation, Athena for aggregation, SNS for alerting.
      </p>

      <Callout type="info" title="Step Functions vs Apache Airflow">
        Step Functions is tightly integrated with AWS services and requires no infrastructure. Airflow is code-first, cloud-neutral, and more flexible for complex Python logic. Most data engineering teams use Airflow (via MWAA on AWS) for complex pipeline orchestration and Step Functions for microservice coordination and event-driven workflows.
      </Callout>

      <h2>State Types</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 my-6">
        {stateTypes.map(s => (
          <div key={s.type} className="p-4 rounded-xl" style={{ background: 'var(--surface)', border: `1px solid ${s.color}30` }}>
            <div className="text-xs font-mono font-bold mb-1" style={{ color: s.color }}>{s.type}</div>
            <p className="text-sm" style={{ color: 'var(--text2)' }}>{s.desc}</p>
          </div>
        ))}
      </div>

      <h2>A Complete Data Pipeline State Machine</h2>
      <p>
        This state machine validates an S3 file, runs a Glue transformation, checks data quality, runs a Gold aggregation in Athena, then sends a success or failure notification. Every step has retry logic and error handling built in.
      </p>
      <CodeBlock code={stateMachineCode} language="json" filename="sales_pipeline_statemachine.json" />

      <h2>Triggering Executions from Python</h2>
      <CodeBlock code={triggerCode} language="python" filename="trigger_pipeline.py" />

      <Callout type="tip" title="Use EventBridge for scheduled triggers">
        Instead of calling start_execution from code, use Amazon EventBridge to trigger Step Functions on a cron schedule. EventBridge rule: cron(0 2 * * ? *) triggers the pipeline every day at 2am UTC. No always-running scheduler needed.
      </Callout>

      <h2>Error Handling — Retry and Catch</h2>
      <div className="space-y-3 my-6">
        {[
          { label: 'Retry',    color: '#00e676', desc: 'Automatically retry a failed task with exponential backoff. Define which error types to retry, how many times, and how long to wait between attempts. Essential for transient failures like Glue job timeouts.' },
          { label: 'Catch',    color: '#f5c542', desc: 'Route to a different state when a specific error occurs. A FileNotFoundError goes to NotifyFailure. A Glue timeout triggers a retry. Catch handles errors that cannot be retried.' },
          { label: 'Timeout',  color: '#ff6b6b', desc: 'Set a maximum time a state can run before Step Functions marks it as failed. Prevents a stuck Glue job from holding up the pipeline indefinitely.' },
          { label: 'Heartbeat',color: '#0078d4', desc: 'For long-running tasks — require periodic heartbeat signals. If the task stops sending heartbeats (crashes silently), Step Functions detects it and can retry or fail the state.' },
        ].map(item => (
          <div key={item.label} className="flex gap-4 p-4 rounded-xl" style={{ background: 'var(--surface)', border: `1px solid ${item.color}30` }}>
            <span className="font-mono text-xs font-bold flex-shrink-0 mt-0.5 w-20" style={{ color: item.color }}>{item.label}</span>
            <p className="text-sm" style={{ color: 'var(--text2)' }}>{item.desc}</p>
          </div>
        ))}
      </div>

      <KeyTakeaways items={[
        'Step Functions orchestrates AWS services into pipelines using visual state machines',
        'State types: Task (call AWS service), Choice (branch), Parallel (concurrent), Map (forEach)',
        'Use .sync resource suffix to wait for Glue, EMR, and Athena jobs to complete before moving on',
        'Built-in Retry with exponential backoff handles transient failures automatically',
        'Catch routes different error types to different recovery paths',
        'Use EventBridge to trigger Step Functions on a cron schedule — no always-running scheduler needed',
      ]} />
    </LearnLayout>
  )
}