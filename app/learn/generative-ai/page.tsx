import type { Metadata } from 'next'
import { PlannedTrackPage } from '@/components/learn/PlannedTrackPage'
import { PLANNED_TRACKS } from '@/data/planned-tracks'

export const metadata: Metadata = {
  title: 'Generative AI & LLM Engineering — Skills Plan',
  description: 'Explore the planned Generative AI and LLM engineering path, and start with related published lessons in Chaduvuko’s AI & ML curriculum.',
  alternates: { canonical: '/learn/generative-ai' },
}

const PUBLISHED_LESSONS = [
  {
    title: 'What is Generative AI?',
    href: '/learn/ai-ml/generative-ai/what-is-generative-ai',
    stage: 'Foundations',
    description: 'Compare generative and discriminative models and learn where major generative model families fit.',
  },
  {
    title: 'Transformers and Self-Attention',
    href: '/learn/ai-ml/deep-learning/transformers-and-attention',
    stage: 'Foundations',
    description: 'Understand the transformer building blocks behind modern language models.',
  },
  {
    title: 'Tokenisation and Word Embeddings',
    href: '/learn/ai-ml/nlp/tokenisation-and-embeddings',
    stage: 'Foundations',
    description: 'Follow how text is tokenised and represented for language-model processing.',
  },
  {
    title: 'LLMs — Pretraining, RLHF, and Scaling Laws',
    href: '/learn/ai-ml/generative-ai/llms-pretraining-rlhf',
    stage: 'Foundations',
    description: 'Study next-token pretraining, instruction alignment, and scaling concepts.',
  },
  {
    title: 'Context Windows and Model Limits',
    href: '/learn/ai-ml/generative-ai/context-windows-model-limits',
    stage: 'Foundations',
    description: 'Budget instructions, history, retrieved evidence, and output; diagnose context overflow and missed information.',
  },
  {
    title: 'Inference Parameters and Model Selection',
    href: '/learn/ai-ml/generative-ai/inference-parameters-model-selection',
    stage: 'Foundations',
    description: 'Compare model and generation settings using task quality, format reliability, latency, and cost.',
  },
  {
    title: 'Prompt Engineering',
    href: '/learn/ai-ml/nlp/prompt-engineering',
    stage: 'Core skills',
    description: 'Practice prompt patterns and compare how task instructions affect model outputs.',
  },
  {
    title: 'RAG — Retrieval-Augmented Generation',
    href: '/learn/ai-ml/nlp/rag-retrieval-augmented-generation',
    stage: 'Core skills',
    description: 'Connect retrieval and generation to answer questions using external documents.',
  },
  {
    title: 'LLM Agents and Tool Use',
    href: '/learn/ai-ml/nlp/llm-agents-and-tool-use',
    stage: 'Core skills',
    description: 'See how a model can select tools and use their results as part of a workflow.',
  },
  {
    title: 'LLM Fine-Tuning in Practice',
    href: '/learn/ai-ml/generative-ai/llm-fine-tuning',
    stage: 'Advanced',
    description: 'Explore fine-tuning workflows and when adapting model weights is appropriate.',
  },
  {
    title: 'Advanced RAG',
    href: '/learn/ai-ml/generative-ai/advanced-rag',
    stage: 'Advanced',
    description: 'Investigate retrieval improvements and the trade-offs in more complex RAG systems.',
  },
  {
    title: 'Multimodal Models — CLIP and LLaVA',
    href: '/learn/ai-ml/generative-ai/multimodal-models',
    stage: 'Specialisations',
    description: 'Explore models that process and relate information across text and images.',
  },
]

export default function GenerativeAITrackPage() {
  const track = PLANNED_TRACKS.find(item => item.slug === 'generative-ai')
  if (!track) throw new Error('Generative AI skills plan is missing from PLANNED_TRACKS')
  return <PlannedTrackPage track={track} publishedLessons={PUBLISHED_LESSONS} />
}
