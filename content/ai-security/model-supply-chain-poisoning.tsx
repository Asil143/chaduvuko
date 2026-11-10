import { LearnLayout } from '@/components/content/LearnLayout'
import { Bullets, Callout, Code, H3, KeyTakeaways, Mistakes, NextLesson, P, Part, Practice, Steps, Table } from '@/components/content/LessonKit'

export default function ModelSupplyChainPoisoning() {
  return (
    <LearnLayout
      title="Model Supply Chain and Data Poisoning"
      description="Risks in third-party models, datasets and packages, data and model poisoning, safe model formats, and verifying what you deploy."
      section="AI Security & LLM Security — Lesson 07"
      readTime="35 min"
    >
      <Part n={1} label="Supply-chain thinking" title="Your Model Arrives Through a Chain of Trust">
        <P>
          An AI application is assembled from more than its prompt and model endpoint. A typical Swiggy-style delivery assistant
          may depend on an external model, embedding model, tokenizer, retrieval framework, vector-store client, datasets,
          container images and the people or automation that publish each artifact. A weak link can introduce a vulnerable
          package, an unexpected behavior, compromised credentials or an artifact that is not the one your team intended to use.
        </P>
        <P>
          Supply-chain security asks three practical questions: <strong>what is this component?</strong> <strong>where did it
          come from?</strong> and <strong>what evidence supports trusting it for this use?</strong> A model card or a download
          count is useful context, not proof. Track the artifact identifier and revision, publisher, license, intended use,
          dependencies, source data disclosures, evaluation results and approval record. Apply the same discipline to a hosted
          model name configured in production as to a weight file stored in your own object store.
        </P>
        <Table
          head={['Component', 'Example risk', 'Useful evidence and control']}
          rows={[
            ['Model or adapter', 'Unexpected behavior, unsafe artifact, unclear source', 'Publisher and immutable revision; hash; license and use review; isolated evaluation'],
            ['Dataset', 'Low-quality or poisoned records, unauthorized sensitive data', 'Collection and labeling provenance; access basis; quality checks; versioned splits'],
            ['Code dependency', 'Compromised or vulnerable transitive package', 'Reviewed dependency manifest, lockfile, advisory monitoring and minimal permissions'],
            ['Build and deploy', 'Artifact changed between evaluation and production', 'Controlled build, signed/attested release where available, digest verification'],
            ['Hosted service', 'Configuration changes or unclear data handling', 'Approved account and endpoint, documented settings, vendor review and change monitoring'],
          ]}
        />
        <Callout type="info">
          OWASP Top 10 for LLM Applications identifies Supply Chain and Data and Model Poisoning as distinct risk areas. Use the
          current OWASP project pages for exact category wording and scope; categories organize risks, they do not certify a product.
        </Callout>
      </Part>

      <Part n={2} label="Provenance" title="Record Where Each Artifact Came From">
        <P>
          Provenance is the history and identity of an artifact: who created or published it, which revision you evaluated,
          where it was obtained, and how it moved into production. Prefer immutable revisions over a floating label such as
          &quot;latest&quot;. Store a cryptographic digest alongside the artifact and compare it with a digest obtained through a
          trusted channel. A matching digest tells you the bytes match the recorded bytes; it does not prove that the publisher,
          data or model is benign.
        </P>
        <P>
          Keep a small inventory that connects the model to its purpose and environment. If the hosted provider does not expose
          weights or a digest, record the provider, endpoint, configured model identifier, account, relevant settings and the
          date and evidence of your approval. Ask how model revisions and service changes are communicated, then define who
          reviews and accepts those changes before your application relies on them.
        </P>
        <Code file="artifact_record.py" code={`
from dataclasses import asdict, dataclass
import hashlib
import json
from pathlib import Path

@dataclass(frozen=True)
class ArtifactRecord:
    name: str
    revision: str
    source: str
    sha256: str
    purpose: str
    approved_by: str


def sha256_file(path: Path) -> str:
    digest = hashlib.sha256()
    with path.open("rb") as artifact:
        for chunk in iter(lambda: artifact.read(1024 * 1024), b""):
            digest.update(chunk)
    return digest.hexdigest()


path = Path("artifacts/approved-model.bin")
record = ArtifactRecord(
    name="support-classifier",
    revision="reviewed-revision-2026-01",
    source="internal approved artifact store",
    sha256=sha256_file(path),
    purpose="classify support tickets",
    approved_by="ml-platform-review",
)
print(json.dumps(asdict(record), indent=2))
`} />
        <P>
          In a real release process, the expected digest must come from a trusted review or signed release record—not be computed
          from the same untrusted file immediately before loading it. Keep approval evidence and the deployed artifact digest
          together so an incident responder can identify exactly what ran.
        </P>
      </Part>

      <Part n={3} label="Data poisoning" title="Quality and Integrity Matter Before Training">
        <P>
          Data poisoning is the intentional manipulation of training or fine-tuning data to influence model behavior. It can
          range from a mislabeled example to a coordinated set of records designed to create a targeted behavior. Accidental
          contamination, duplicate records, hidden evaluation overlap and unreliable labels can also undermine a model without
          meeting the definition of a deliberate attack. In retrieval, an untrusted document that steers a generated response is
          better analyzed as a content and access-control risk; keep that separate from poisoning the model’s training data.
        </P>
        <P>
          Reduce risk at collection and curation boundaries. Record source and licensing context, make dataset versions
          reproducible, restrict write access, preserve review history and separate training, validation and test data. Evaluate
          on representative slices and compare changes with a known baseline. A sudden performance shift or a suspiciously
          narrow behavior deserves investigation, but aggregate metrics alone may hide a targeted effect.
        </P>
        <Steps items={[
          'Define which sources and labels are acceptable for this model’s purpose.',
          'Track dataset revision, transformations, deduplication and human review decisions.',
          'Protect the pipeline that can add, relabel or export examples; use approval for sensitive changes.',
          'Keep a holdout evaluation set under separate access and governance from training inputs.',
          'Investigate anomalies and document whether the model is fit for the intended use before release.',
        ]} />
        <Callout type="warning">
          A clean-looking sample does not prove a large dataset is clean. Use layered controls—source review, statistical and
          behavioral checks, independent evaluation and restricted data changes—rather than relying on one detector.
        </Callout>

        <H3>Make Dataset Revisions Traceable</H3>
        <P>
          Dataset lineage should be reproducible too. The digest below can help compare a reviewed file with a later copy;
          it does not validate the data’s source, labels or suitability. Keep those review findings in the dataset record.
        </P>
        <Code file="dataset_manifest.py" code={`
from pathlib import Path
import hashlib
import json


def digest(path: Path) -> str:
    hasher = hashlib.sha256()
    with path.open("rb") as source:
        for block in iter(lambda: source.read(1024 * 1024), b""):
            hasher.update(block)
    return hasher.hexdigest()


path = Path("data/reviewed-training-set.jsonl")
manifest = {
    "dataset_revision": "support-data-reviewed-01",
    "source_record": "internal-review-ticket-184",
    "file_sha256": digest(path),
    "evaluation_split_separate": True,
}
print(json.dumps(manifest, indent=2))
`} />
        <Callout type="tip">
          Keep the expected digest and review ticket in a trusted, access-controlled release record—not beside an untrusted
          file where both can be replaced together.
        </Callout>
      </Part>

      <Part n={4} label="Safe artifact handling" title="Inspect Formats and Isolate the Loading Path">
        <P>
          Model files are data, but some serialization formats can encode executable behavior when loaded by general-purpose
          runtimes. Treat an unfamiliar artifact like untrusted input. Prefer formats designed to store tensor data without
          arbitrary object reconstruction when the ecosystem supports them, and confirm the exact format and loader behavior
          from the framework’s official documentation. A safer format reduces one class of risk; it does not establish model
          provenance or protect against malicious weights.
        </P>
        <P>
          Never make a convenience setting that enables arbitrary deserialization a default for files from the internet. Keep
          conversion and inspection jobs isolated, unprivileged and without production credentials or network access unless
          specifically required. Scan and review dependencies, restrict filesystem access, and promote only approved artifacts
          into the serving environment. A hash, malware scan or sandbox is a useful layer—not a reason to skip source review.
        </P>
        <Table
          head={['Check', 'What it helps establish', 'What it does not establish']}
          rows={[
            ['Digest comparison', 'The deployed bytes match an approved reference', 'That the approved bytes are safe or the reference was trustworthy'],
            ['Format review', 'How the loader interprets the artifact', 'That the learned behavior is correct or free of backdoors'],
            ['Isolated inspection', 'Limits impact if parsing or conversion behaves unexpectedly', 'That all future runs or dependencies are safe'],
            ['Model evaluation', 'Observed behavior on selected tests and intended tasks', 'A proof that every input or attack is handled correctly'],
          ]}
        />
      </Part>

      <Part n={5} label="Dependency hygiene" title="Secure the Code Around the Model">
        <P>
          LLM applications inherit ordinary software supply-chain risks. A package that parses documents or loads model files
          can have powerful access to prompts, cloud credentials and stored embeddings. Keep dependencies necessary and current
          through the organization’s review process, pin resolved versions for reproducible deployments, and monitor relevant
          advisories. Review transitive dependencies as well as direct imports; the code you did not write still runs with the
          permissions you granted it.
        </P>
        <Code file="dependency_review.py" code={`
from pathlib import Path
import json

# A lightweight policy check over a release inventory, not a vulnerability scanner.
REQUIRED_FIELDS = {"name", "version", "source", "review_status"}
APPROVED = {"approved", "accepted-with-mitigation"}


def validate_inventory(path: Path) -> list[str]:
    inventory = json.loads(path.read_text(encoding="utf-8"))
    findings: list[str] = []
    for component in inventory.get("components", []):
        missing = REQUIRED_FIELDS - component.keys()
        if missing:
            findings.append(f"{component.get('name', 'unknown')}: missing {sorted(missing)}")
        if component.get("review_status") not in APPROVED:
            findings.append(f"{component.get('name', 'unknown')}: review is not approved")
    return findings


findings = validate_inventory(Path("release-inventory.json"))
if findings:
    raise SystemExit("Release blocked: " + "; ".join(findings))
print("Inventory policy checks passed")
`} />
        <P>
          This example checks inventory completeness only; it does not fetch advisory databases or prove a dependency is safe.
          Pair such a policy gate with trusted package sources, lockfile review, automated advisory scanning, reproducible build
          practices where feasible and a response owner for newly disclosed issues. Avoid copying install commands from unknown
          model cards or notebooks into a privileged build environment.
        </P>
      </Part>

      <Part n={6} label="Release controls" title="Promote the Exact Artifact You Evaluated">
        <P>
          The model that passed evaluation and the model serving traffic must be the same approved artifact or provider
          configuration. Give releases an explicit version, make changes reviewable and retain a rollback option. On deployment,
          compare the artifact digest or provider configuration with the approved record. Restrict who can publish a model,
          change a production alias, update a dataset or alter the code that retrieves model files.
        </P>
        <Bullets items={[
          <>Separate development experimentation from production credentials and data.</>,
          <>Require a review record for new model sources, adapters, datasets and high-impact dependency updates.</>,
          <>Keep deployment identity least-privileged; it should retrieve only approved artifacts.</>,
          <>Monitor upstream notices, model revisions and dependency advisories, with a named owner for triage.</>,
          <>Maintain an incident plan for revoking a model or package and restoring a known-good release.</>,
        ]} />
        <Callout type="tip">
          SBOMs and model inventories complement each other. A software bill of materials can describe software components;
          add model- and dataset-specific provenance because a package list does not explain the origin or approval of weights.
        </Callout>
      </Part>

      <Part n={7} label="Pitfalls" title="Common Mistakes">
        <Mistakes items={[
          { mistake: 'Trusting a popular download or a polished model card', cause: 'Popularity and documentation do not prove publisher identity, artifact integrity or fitness for your task.', fix: 'Verify the source and immutable revision, review intended use and provenance, and evaluate in an isolated environment.' },
          { mistake: 'Treating a checksum as a safety certificate', cause: 'A hash detects a mismatch only against a reference you already trust.', fix: 'Obtain expected digests through an approved release channel and keep behavioral and source reviews separate.' },
          { mistake: 'Loading an unknown model with permissive deserialization', cause: 'Some formats or loaders can reconstruct executable objects, expanding the attack surface.', fix: 'Use documented safer formats and trusted loaders; isolate unavoidable inspection and avoid production secrets.' },
          { mistake: 'Relying on one dataset-cleaning score', cause: 'Aggregate checks can miss targeted changes, label problems or coverage gaps.', fix: 'Track sources and revisions, use independent evaluation slices, investigate anomalies and document residual risk.' },
        ]} />
      </Part>

      <Part n={8} label="Practice and review" title="Create a Model Release Gate">
        <Practice
          title="Review a fictional ticket-triage model release"
          tasks={[
            'Inventory the model, tokenizer, dataset, adapters, packages and hosting configuration; name a source and owner for each.',
            'Specify how an immutable revision and expected digest are recorded and who approves them.',
            'Write a data-curation checklist that covers provenance, labels, access, versioning and a held-out evaluation set.',
            'Define how an untrusted artifact is inspected without production secrets or unnecessary network access.',
            'Draft release-blocking conditions and a rollback action for a changed model or newly disclosed dependency issue.',
          ]}
          hint="Use hypothetical artifacts and metadata. A checksum confirms identity relative to a reference, not that the artifact is trustworthy."
        />
        <KeyTakeaways items={[
          'AI supply chains include data, models, packages, build pipelines, hosted services and deployment configuration.',
          'Record provenance and immutable revisions; verify deployed identity against a trusted approval record.',
          'A matching digest proves byte identity, not safety, integrity of the source or benign model behavior.',
          'Data poisoning defenses need source governance, controlled changes and independent behavioral evaluation.',
          'Treat model artifacts as untrusted input; review serialization behavior and isolate inspection.',
          'Use OWASP LLM risks as a taxonomy, and turn supply-chain findings into an owned release and rollback process.',
        ]} />
        <H3>Next</H3>
        <NextLesson href="/learn/ai-security/ai-red-teaming" label="Lesson 08 · AI Red Teaming and Security Testing" text="Next, plan an authorized, controlled evaluation that tests AI-specific abuse cases and turns findings into repeatable defensive checks." />
      </Part>
    </LearnLayout>
  )
}
