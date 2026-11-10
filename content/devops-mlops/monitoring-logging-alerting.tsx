import { Callout, Code, H3, KeyTakeaways, Mistakes, NextLesson, P, Part, Practice, Steps, Table } from '@/components/content/LessonKit'
import { LearnLayout } from '@/components/content/LearnLayout'

export default function MonitoringLoggingAlerting() {
  return (
    <LearnLayout
      title="Monitoring, Logging and Alerting"
      description="Understand metrics, logs, and traces; create useful Prometheus and Grafana views; set service-level objectives; and respond to alerts with a sustainable on-call practice."
      section="DevOps & Cloud Infrastructure — Lesson 10"
      readTime="35 min"
    >
      <Part n={1} label="Why observe a service?" title="Answer the User Question Before the Infrastructure Question">
        <P>
          At 9:15 AM, learners report that a course dashboard is taking too long to open. The first useful question is not
          &quot;is the CPU high?&quot; It is &quot;are users affected, and where is the request getting slow?&quot; Monitoring turns
          system behavior into evidence an operator can use to detect impact, diagnose causes, and decide whether to mitigate or
          escalate.
        </P>
        <P>
          Three signals complement one another: metrics summarize numeric behavior over time, logs record discrete events with
          context, and traces connect the work performed across services for one request. A metric can tell you that latency has
          increased; a trace can show which dependency added time; logs can provide the relevant error details. None of the three
          is sufficient on its own for every investigation.
        </P>
        <Table
          head={['Signal', 'Best for', 'Example']}
          rows={[
            ['Metrics', 'Trends, rates, saturation, and alert conditions', 'Request rate, error ratio, queue depth, CPU use'],
            ['Logs', 'Detailed events and error context', 'A failed order lookup with request ID and error category'],
            ['Traces', 'Following one request across service boundaries', 'Browser API → order service → database call'],
          ]}
        />
        <Callout type="info">
          Observability is about learning what the system is doing from its outputs. Collecting a large volume of data does not
          automatically make a system observable; choose signals that help answer real operational questions.
        </Callout>
      </Part>

      <Part n={2} label="Metrics" title="Measure Rates, Errors, Latency and Saturation">
        <P>
          A useful service dashboard often begins with traffic, errors, latency, and saturation. Traffic describes demand;
          errors describe failed work; latency describes how long work takes; saturation shows whether a constrained resource is
          nearing capacity. Track these at the service boundary and, where useful, at key dependencies such as a database or
          queue. Use units, names, and label conventions consistently.
        </P>
        <P>
          Counters increase over time, gauges can rise or fall, and histograms record observations in buckets that support
          latency distributions and percentiles. Averages can hide a slow tail: a small number of very slow requests may make the
          user experience poor even when the average looks acceptable. Choose histogram buckets and aggregation carefully, and
          compare like-for-like request classes.
        </P>
        <Table
          head={['Metric idea', 'Question it helps answer', 'Caution']}
          rows={[
            ['Request rate', 'How much work is arriving?', 'Break down only by useful, bounded dimensions.'],
            ['Error ratio', 'What share of requests fail?', 'Distinguish expected client errors from service failures.'],
            ['Latency distribution', 'How slow are typical and tail requests?', 'Averages alone hide outliers and slow user journeys.'],
            ['Saturation', 'Which resource is near its useful limit?', 'CPU alone may miss memory, connection, queue, or downstream limits.'],
          ]}
        />
        <Callout type="tip">
          Keep metric labels low-cardinality. A unique request ID, user ID, or raw URL as a label can create unbounded time
          series and cost; put request-specific details in logs or traces instead.
        </Callout>
      </Part>

      <Part n={3} label="Prometheus" title="Scrape Metrics and Evaluate Rules">
        <P>
          Prometheus commonly collects metrics by scraping an HTTP endpoint exposed by an application or exporter. The application
          must instrument the measurements; Prometheus cannot infer meaningful business events from a container alone. A scrape
          configuration names a job and targets that expose a metrics endpoint. Service discovery and authentication vary by
          environment; this small example is a starting point for a local lab, not a production security configuration.
        </P>
        <Code lang="yaml" file="prometheus.yml" code={`
global:
  scrape_interval: 30s

rule_files:
  - "alerts.yml"

scrape_configs:
  - job_name: "orders-api"
    metrics_path: "/metrics"
    static_configs:
      - targets: ["orders-api:80"]
`} />
        <P>
          Prometheus stores labeled time series. A metric such as <code>http_requests_total</code> is a counter emitted by the
          application; labels might include a bounded route name and status class. PromQL can calculate a per-second rate over a
          time window and aggregate it across instances. Confirm metric names and labels in the actual service before writing a
          dashboard or rule—custom instrumentation determines what is available.
        </P>
        <P>
          From a local lab where the Prometheus HTTP API is reachable on the loopback interface, query the standard
          <code> up</code> metric for this scrape job. A successful response means Prometheus has a recent sample for the target;
          it does not prove that the application is healthy for users.
        </P>
        <Code lang="bash" file="query-prometheus.sh" code={`
curl --fail --get 'http://localhost:9090/api/v1/query' \
  --data-urlencode 'query=up{job="orders-api"}'
`} />
        <Code lang="yaml" file="alerts.yml" code={`
groups:
  - name: orders-api
    rules:
      - alert: ElevatedServerErrorRatio
        expr: |
          sum(rate(http_requests_total{status=~"5.."}[5m]))
          /
          clamp_min(sum(rate(http_requests_total[5m])), 1)
          > 0.02
        for: 10m
        labels:
          severity: warning
        annotations:
          summary: "Orders API server error ratio is elevated"
          description: "Check the service dashboard and recent deploys."
`} />
        <P>
          The two-percent expression is only a teaching threshold; it is not a universal SLO. A real alert should reflect
          customer impact, baseline traffic, and the service&apos;s agreed objectives. The rule also assumes the counter exists
          and that the status label has the expected values. Test the expression against real series before routing pages.
        </P>
      </Part>

      <Part n={4} label="Logs and traces" title="Keep Context Useful, Safe and Connected">
        <P>
          Structured logs make fields searchable: timestamp, severity, service, environment, event name, and a request or trace
          identifier. Log the reason a request failed without dumping credentials, authorization headers, full payment data, or
          unnecessary personal information. Define retention and access based on operational need and applicable policy; logs
          are data stores and deserve security controls.
        </P>
        <P>
          Distributed tracing represents a request as spans across services. Instrumenting a service with OpenTelemetry or a
          compatible library lets teams propagate trace context and export spans to a collector or backend. A trace ID in logs
          helps move from a metric alert to the exact request path. Sampling can control volume, but ensure the sampling policy
          does not systematically hide the rare failures you need to investigate.
        </P>
        <Table
          head={['Question', 'Signal to start with', 'Next step']}
          rows={[
            ['Did user-facing errors rise?', 'Error-rate metric', 'Filter by route/status and inspect a representative trace.'],
            ['Which request failed and why?', 'Structured log', 'Follow the trace ID and inspect related service spans.'],
            ['Which dependency added latency?', 'Trace waterfall', 'Compare span timing and dependency metrics.'],
            ['Is the issue widespread or one request?', 'Metrics by bounded service/route dimension', 'Use logs and traces for per-request detail.'],
          ]}
        />
        <Callout type="warning">
          Redact sensitive values before they reach a log, trace, or metric label. Removing data later is difficult because it may
          already be replicated, exported, and retained by several systems.
        </Callout>
      </Part>

      <Part n={5} label="Grafana" title="Build Dashboards Around Decisions">
        <P>
          Grafana can query Prometheus and other data sources, render panels, and help operators move from a high-level service
          view to a focused investigation. A useful dashboard answers a few operational questions at a glance: is demand normal,
          are users seeing errors, is latency within target, and which dependency is saturated? Add links to logs, traces, and
          recent deployments so the next diagnostic step is clear.
        </P>
        <P>
          Make panels consistent in units and time ranges, add descriptions, and use labels that separate environment and
          service without exposing sensitive dimensions. Avoid a wall of gauges that nobody uses. Review dashboards after
          incidents and remove panels that are redundant or misleading. Keep access controls aligned with the sensitivity of the
          underlying data.
        </P>
        <Steps items={[
          'Start with service traffic, errors, latency distribution, and saturation.',
          'Add the most important dependencies and queue/backlog signals.',
          'Show deployment markers or a link to release history when available.',
          'Link a panel to the relevant logs and traces for deeper investigation.',
          'Ask an on-call teammate to use the dashboard during a drill and improve unclear panels.',
        ]} />
      </Part>

      <Part n={6} label="SLIs and SLOs" title="Define Reliability from the User Perspective">
        <P>
          A Service Level Indicator (SLI) is a measured aspect of service behavior, such as the proportion of valid requests
          completed successfully or a latency distribution. A Service Level Objective (SLO) is the target for an SLI over a
          defined time window. A Service Level Agreement (SLA) is an external commitment that may have business consequences;
          an internal SLO is not automatically an SLA. Choose indicators users care about rather than optimizing an arbitrary
          host metric.
        </P>
        <P>
          For a course platform, possible SLIs include successful lesson-page loads, completion of a practice submission, and
          latency for those actions. Define which requests count, how synthetic checks are treated, and how the measurement is
          aggregated. A target such as 99.9% is only an example until the product team chooses a realistic objective based on
          user needs, architecture, and evidence. An error budget is the remaining allowed unreliability implied by the SLO;
          teams can use it to balance release speed and reliability work.
        </P>
        <Table
          head={['Term', 'Definition', 'Example question']}
          rows={[
            ['SLI', 'A quantified measure of a user-facing service property', 'What proportion of valid lesson requests succeeded?'],
            ['SLO', 'An agreed target for an SLI over a time window', 'What reliability should the course experience meet?'],
            ['Error budget', 'The allowed unreliability implied by an SLO', 'How much budget remains before release risk needs review?'],
            ['SLA', 'An external commitment with defined terms and consequences', 'What has the service promised to a customer?'],
          ]}
        />
      </Part>

      <Part n={7} label="Alerting and on-call" title="Page for Actionable User Impact">
        <P>
          An alert should identify a symptom, explain its impact, and point to a next action. Page when a human needs to respond
          soon—for example, sustained user-facing failures or a rapidly exhausting error budget. Send lower urgency capacity
          trends and non-urgent maintenance to a ticket or dashboard. Alerts based on transient noise, missing labels, or an
          unowned service create fatigue and teach people to ignore the signal.
        </P>
        <P>
          A practical on-call setup has an owner, a rota, a handoff, a runbook, escalation contacts, and a way to acknowledge and
          resolve incidents. During an incident, assess impact, communicate clearly, mitigate first when safe, and preserve a
          timeline. Afterward, review contributing conditions and improve tests, dashboards, automation, and the runbook without
          blaming individuals. Rotate fairly and provide backup so an alert is not dependent on one person being available.
        </P>
        <Callout type="example">
          If an alert fires for rising order API errors, the page should say which user journey is affected, the duration and
          scope, a dashboard link, and the first safe checks. It should not merely say &quot;CPU high&quot; with no owner or action.
        </Callout>
        <Callout type="tip">
          Alert on symptoms and use metrics for diagnosis. A CPU threshold may be a useful signal, but page on it only when it
          predicts user impact or requires timely human action.
        </Callout>
      </Part>

      <Part n={8} label="Pitfalls" title="Common Mistakes">
        <Mistakes items={[
          { mistake: 'Alerting on every small metric change', cause: 'Normal variance creates noise and responders stop trusting pages.', fix: 'Use meaningful windows, user-impact signals, ownership, and an action for every page.' },
          { mistake: 'Putting request IDs or user IDs into metric labels', cause: 'Each unique value creates additional time series and uncontrolled cardinality.', fix: 'Keep labels bounded; put request-specific context in redacted logs and traces.' },
          { mistake: 'Logging full request bodies and credentials to debug faster', cause: 'Secrets and personal data spread into a broadly accessible, retained system.', fix: 'Log explicit safe fields, redact at the source, restrict access, and set retention intentionally.' },
          { mistake: 'Writing an SLO around a machine metric only', cause: 'Healthy CPU does not prove that a learner can load a lesson or submit practice.', fix: 'Choose SLIs that measure an important user journey and define the eligible request population.' },
        ]} />
      </Part>

      <Part n={9} label="Practice" title="Instrument and Respond to a Service Signal">
        <Practice
          title="Create a useful view and a humane alert"
          tasks={[
            'List one traffic, error, latency, and saturation metric for an API; note the source and units for each.',
            'Sketch a Grafana dashboard that helps an on-call engineer assess user impact and find the next diagnostic signal.',
            'Write an SLI and SLO for one learner journey, clearly defining valid requests and the measurement window.',
            'Draft an alert with a symptom, duration, severity, owner, runbook, dashboard, and immediate next action.',
            'Review a sample log event and remove credentials, payment data, and unnecessary personal identifiers.',
          ]}
          hint="Start with the user journey and the action a responder can take. A metric that cannot change a decision may not belong on the primary dashboard."
        />
      </Part>

      <KeyTakeaways items={[
        'Metrics show trends and aggregate behavior, logs give event context, and traces connect work across service boundaries.',
        'Instrument application behavior deliberately; Prometheus can scrape measurements but cannot invent useful business signals.',
        'Use Grafana dashboards to answer operational questions and link from summary signals to logs, traces, and releases.',
        'Define SLIs and SLOs around user journeys; an SLO, an error budget, and an external SLA are related but distinct.',
        'Page on actionable user impact, not noisy fluctuations; give each alert an owner, runbook, and escalation path.',
        'Keep sensitive data out of telemetry and avoid high-cardinality metric labels such as user or request IDs.',
      ]} />

      <H3>Next</H3>
      <NextLesson
        href="/learn/cloud-data"
        label="Next course · Cloud Data Engineering"
        text="You have completed the DevOps and cloud infrastructure foundations. Continue with Cloud Data Engineering to build data workloads on AWS, Azure, and Google Cloud."
      />
    </LearnLayout>
  )
}
