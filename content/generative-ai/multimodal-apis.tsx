import { LearnLayout } from '@/components/content/LearnLayout'
import { Callout, Code, H3, KeyTakeaways, Mistakes, NextLesson, P, Part, Practice, Steps, Table } from '@/components/content/LessonKit'

export default function MultimodalApis() {
  return (
    <LearnLayout
      title="Multimodal APIs — Vision, Audio and Speech"
      description="Send images and documents to vision-capable models, transcribe and generate speech, and design features that combine text, images and audio."
      section="Generative AI & LLM Engineering — Lesson 05"
      readTime="35 min"
    >
      <Part n={1} label="Concept" title="A Multimodal Request Has More Than One Kind of Input">
        <P>
          A text-only model receives text and returns text. A multimodal feature may combine text with an image, a scanned page,
          an audio recording, or generated speech. The application still sends a request to a model API, but the content parts
          and processing constraints differ. You need to know what is sent, how large it is, whether the provider can process
          it, and what the response means before you build a user-facing workflow.
        </P>
        <P>
          Think of a campus help desk that accepts a photo of a fee receipt and a spoken question. The image may contain a
          student name or transaction reference; the audio may capture other people in the room. Make the user intent explicit,
          request only the necessary media, and avoid treating model output as verified financial data. If a number affects a
          payment or account, validate it against an authoritative system and ask for confirmation.
        </P>
        <Table
          head={['Modality', 'Typical task', 'Important boundary']}
          rows={[
            ['Image input', 'Describe a chart or extract visible text', 'Image quality, crop, resolution and private content affect results'],
            ['Audio input', 'Transcribe a lecture question or support message', 'Consent, language, noise and speaker ambiguity matter'],
            ['Text to speech', 'Read an approved answer aloud', 'Generated speech is output, not proof that the answer is correct'],
            ['Mixed input', 'Answer a question about a picture or recording', 'Keep each content item tied to its source and permissions'],
          ]}
        />
        <Callout type="info">
          Multimodal does not mean &quot;understands everything in every file.&quot; A model can miss small text, confuse chart axes,
          or mishear a name. Test on the media your users actually submit and design a useful fallback.
        </Callout>
      </Part>

      <Part n={2} label="Plan" title="Choose the Right Processing Path">
        <P>
          Start with the user outcome, not the model feature list. If the task is transcription, a speech-to-text API often
          returns text that you can review, search, or summarize. If a question depends on both a picture and its caption, send
          both to a vision-capable model in one request. For long documents, first determine whether the API supports the file
          and page layout you need; converting a PDF to page images can be a fallback, but it changes cost and privacy
          considerations.
        </P>
        <Steps items={[
          'Define the exact decision or response the feature supports, and identify what must remain human-reviewed.',
          'Check supported file types, size limits, languages, regions and retention terms in current provider documentation.',
          'Validate file type and size on your server; do not trust a filename or browser-provided content type alone.',
          'Minimize the media: crop irrelevant regions, shorten recordings, and remove unrelated pages where appropriate.',
          'Record provenance, consent and processing status without storing raw media longer than the feature needs.',
        ]} />
        <Callout type="tip">
          Separate media handling from the prompt. A small adapter can validate, normalize and pass media to the provider while
          the rest of the application keeps the same task interface.
        </Callout>
      </Part>

      <Part n={3} label="Vision" title="Send a Local Image with a Text Question">
        <P>
          This example reads an image from disk, encodes it as a data URL, and submits a question with the image as a content
          part. The OpenAI Python SDK and Responses API are used as one concrete path. Supply the vision model through
          <code> OPENAI_VISION_MODEL</code>; model availability and accepted image formats depend on your account and the
          provider's current documentation.
        </P>
        <Code file="ask_about_image.py" code={`
import base64
import mimetypes
import os
from pathlib import Path

from openai import OpenAI


def data_url_for(path: Path) -> str:
    media_type, _ = mimetypes.guess_type(path.name)
    if media_type not in {"image/jpeg", "image/png", "image/webp", "image/gif"}:
        raise ValueError("Choose a supported image format")
    encoded = base64.b64encode(path.read_bytes()).decode("ascii")
    return f"data:{media_type};base64,{encoded}"


client = OpenAI()
image_url = data_url_for(Path("receipt.jpg"))
response = client.responses.create(
    model=os.environ["OPENAI_VISION_MODEL"],
    input=[{
        "role": "user",
        "content": [
            {"type": "input_text", "text": "Describe the visible fields. Do not infer missing values."},
            {"type": "input_image", "image_url": image_url},
        ],
    }],
)
print(response.output_text)
`} />
        <P>
          The example is convenient for a small local file, not a production upload endpoint. Check the byte size before reading
          the whole file, authenticate the user, store uploads outside a public directory, and use a provider-supported file or
          URL flow where appropriate. Avoid logging a data URL: it contains the complete image payload.
        </P>
      </Part>

      <Part n={4} label="Documents" title="Treat Page Images and Extracted Text as Different Evidence">
        <P>
          A scanned document has pixels; a digitally generated PDF may also have an accessible text layer and layout. OCR can
          make searchable text, but tables, stamps and reading order may be lost. A vision model may describe the page, but its
          extraction can still be wrong. Choose extraction according to the task, preserve page numbers and source references,
          and show the original excerpt when a learner or support agent needs to verify an answer.
        </P>
        <Code file="document_job.py" code={`
from dataclasses import dataclass
from pathlib import Path


@dataclass(frozen=True)
class PageEvidence:
    page_number: int
    text: str
    source_file: str
    extraction_method: str


def prepare_document(path: Path, *, max_bytes: int) -> list[PageEvidence]:
    if not path.is_file() or path.stat().st_size > max_bytes:
        raise ValueError("File is missing or exceeds the upload limit")
    if path.suffix.lower() not in {".pdf", ".png", ".jpg", ".jpeg"}:
        raise ValueError("Unsupported document type")

    # Delegate PDF parsing or OCR to a vetted, sandboxed service/library.
    # Return one evidence record per page and retain page-level provenance.
    return extract_pages(path)


pages = prepare_document(Path("handbook.pdf"), max_bytes=8_000_000)
for page in pages:
    print(page.page_number, page.extraction_method, page.text[:120])
`} />
        <P>
          <code>extract_pages</code> is an adapter boundary to your selected PDF or OCR tool; its implementation and limits
          depend on that tool. Never parse an untrusted upload with a privileged process that can access unrelated files or
          network services. For a policy assistant, answer with a document title and page reference, then let the user open the
          original page to confirm the wording.
        </P>
      </Part>

      <Part n={5} label="Speech-to-text" title="Transcribe Audio and Keep the Original Around for Review">
        <P>
          Transcription converts speech into text; it does not certify who spoke or whether the words are true. Language mixing,
          background noise, overlapping speakers and names can all affect the result. For a support ticket, let the person edit
          the transcription before sending it. Keep the raw recording only if there is a documented need and a clear retention
          policy.
        </P>
        <Code file="transcribe_audio.py" code={`
import os
from pathlib import Path

from openai import OpenAI


client = OpenAI()
audio_path = Path("question.m4a")
if not audio_path.is_file():
    raise FileNotFoundError(audio_path)

with audio_path.open("rb") as audio_file:
    transcript = client.audio.transcriptions.create(
        model=os.environ["OPENAI_TRANSCRIPTION_MODEL"],
        file=audio_file,
    )

print(transcript.text)
`} />
        <P>
          Use a model name from configuration and check the current audio API documentation for supported formats, request
          sizes, language hints and response options. Do not silently drop low-confidence or unintelligible sections; mark them
          for review. In a UPI support workflow, a transcribed transaction reference should be checked against the payment
          system rather than copied directly into an action.
        </P>
        <Callout type="warning">
          A recording can contain personal or financial information even when the user describes it as a simple voice note.
          Explain what will be processed, restrict who can access it, and avoid sending unrelated audio to an external service.
        </Callout>
      </Part>

      <Part n={6} label="Text-to-speech" title="Generate Speech from an Approved Text Answer">
        <P>
          Text-to-speech is useful for accessibility and hands-free use. Generate audio only after your application has applied
          its normal policy and validation to the text. If your app speaks a payment status, source that status from the bank or
          payment provider and format it safely; a language model should not invent transaction state.
        </P>
        <Code file="speak_answer.py" code={`
import os
from pathlib import Path

from openai import OpenAI


client = OpenAI()
answer = "Your support request has been received. Check the app for updates."
audio = client.audio.speech.create(
    model=os.environ["OPENAI_TTS_MODEL"],
    voice=os.environ["OPENAI_TTS_VOICE"],
    input=answer,
)
audio.write_to_file(Path("answer.mp3"))
`} />
        <P>
          Voice identifiers and supported output formats vary by provider and can change, so configure them and check the
          provider's documentation. If users can download audio, apply the same authorization and retention rules as for the
          underlying answer. Let users choose text instead, and do not imitate a real person's voice without clear permission.
        </P>
      </Part>

      <Part n={7} label="Production" title="Build a Safe, Observable Media Pipeline">
        <P>
          Media work adds bytes, processing time and privacy exposure to a feature. Apply authentication and authorization before
          accepting the upload; enforce request and duration limits; use an allowlist of formats; and scan or sandbox file
          processing. A background job can make long transcription or document extraction resilient, while a visible status
          keeps the user informed. Keep provider credentials on the server.
        </P>
        <Table
          head={['Concern', 'Practical control', 'What to measure']}
          rows={[
            ['Latency', 'Queue long jobs and report progress', 'Upload-to-result time and failure rate'],
            ['Quality', 'Test representative languages, scans and noise', 'Edit rate, missed fields and user corrections'],
            ['Privacy', 'Minimize retention and restrict access', 'Stored bytes, access events and deletion completion'],
            ['Cost', 'Bound media size and avoid duplicate processing', 'Requests, input size and spend by workflow'],
          ]}
        />
        <Steps items={[
          'Store each upload under an opaque ID and associate it with the authenticated owner.',
          'Validate type, dimensions or duration and reject unsupported or oversized media before provider calls.',
          'Send only the required content using server-side credentials and configured model identifiers.',
          'Store the result with a source reference, processing status and retention deadline.',
          'Allow review, correction and deletion; log errors and metrics without logging raw media or secrets.',
        ]} />
        <Callout type="example">
          A Swiggy-style delivery support flow can ask a rider to photograph a damaged package, but the model's description
          should only help triage. Refund eligibility remains an explicit business rule and a human can review ambiguous cases.
        </Callout>
      </Part>

      <Part n={8} label="Pitfalls" title="Common Mistakes">
        <Mistakes items={[
          { mistake: 'Trusting extracted text as exact', cause: 'Blur, handwriting, layout and accents can cause transcription or vision errors.', fix: 'Show evidence, allow correction, and validate important values against a trusted source.' },
          { mistake: 'Accepting uploads by extension only', cause: 'The filename does not prove the actual file type or safe contents.', fix: 'Validate content, size and format server-side, and isolate parsers for untrusted files.' },
          { mistake: 'Sending the entire recording or document by default', cause: 'Extra pages or audio increase exposure, latency and processing cost.', fix: 'Minimize the media to the task and document retention and consent.' },
          { mistake: 'Putting provider keys in a browser app', cause: 'Users can inspect frontend bundles and network requests.', fix: 'Proxy media processing through an authenticated server that owns credentials and limits.' },
        ]} />
      </Part>

      <Part n={9} label="Practice" title="Prototype a Receipt and Voice-Note Helper">
        <Practice
          title="A review-first multimodal support tool"
          tasks={[
            'Write a server-side image adapter that accepts one allowlisted format, rejects oversized files and asks a vision model only for visible fields.',
            'Add a transcription path that reads the model identifier from configuration and displays the text for user correction.',
            'Create a text-to-speech path for a fixed, verified status message; do not let the model create payment status.',
            'Design a small evaluation set with clear, blurry, rotated and partially obscured receipt images plus noisy audio samples.',
            'Document consent, access controls, retention and deletion for original files and derived text.',
          ]}
          hint="Keep provider calls behind adapters. Test file validation and authorization locally with a fake adapter before making paid requests."
        />
      </Part>

      <KeyTakeaways items={[
        'A multimodal API combines text with image or audio content, but every modality has different input and quality constraints.',
        'Treat model output as evidence to review, not as verified identity, financial state or ground truth.',
        'Validate and minimize uploads server-side; keep credentials and raw media away from public frontend code and logs.',
        'Use transcription for reviewable text and generate speech only from an approved answer.',
        'Track provenance, consent, retention, latency, failures and user corrections across the media pipeline.',
        'Configure model and voice identifiers and confirm current provider capabilities in official documentation.',
      ]} />

      <H3>Next</H3>
      <NextLesson
        href="/learn/generative-ai/embeddings-in-practice"
        label="Lesson 06 · Embeddings in Practice — Chunking and Similarity Search"
        text="You can accept images and audio. Next, turn text into vectors and retrieve semantically related passages from your own documents."
      />
    </LearnLayout>
  )
}
