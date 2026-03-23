// Single source of truth for every AI/ML section and its topics.
// Every page imports from here — change a name once, updates everywhere.

export type TopicStatus = 'live' | 'soon'

export type Topic = {
  slug: string
  title: string
  status: TopicStatus
}

export type Section = {
  slug: string
  num: string
  title: string
  shortTitle: string
  color: string
  topics: Topic[]
}

export const AIML_SECTIONS: Section[] = [
  {
    slug: 'math-foundations',
    num: '01',
    title: 'Math Foundations',
    shortTitle: 'Math',
    color: '#7F77DD',
    topics: [
      { slug: 'vectors-and-matrices',        title: 'Vectors & Matrices',             status: 'soon' },
      { slug: 'matrix-multiplication',        title: 'Matrix Multiplication',          status: 'soon' },
      { slug: 'dot-product-and-similarity',   title: 'Dot Product & Similarity',       status: 'soon' },
      { slug: 'eigenvalues-eigenvectors',     title: 'Eigenvalues & Eigenvectors',     status: 'soon' },
      { slug: 'derivatives-and-gradients',    title: 'Derivatives & Gradients',        status: 'soon' },
      { slug: 'chain-rule',                   title: 'Chain Rule',                     status: 'soon' },
      { slug: 'probability-distributions',    title: 'Probability Distributions',      status: 'soon' },
      { slug: 'bayes-theorem',                title: "Bayes' Theorem",                 status: 'soon' },
      { slug: 'information-theory',           title: 'Information Theory',             status: 'soon' },
    ],
  },
  {
    slug: 'programming',
    num: '02',
    title: 'Programming Ecosystem',
    shortTitle: 'Python',
    color: '#888888',
    topics: [
      { slug: 'python-for-ml',         title: 'Python for ML',         status: 'soon' },
      { slug: 'numpy-arrays',          title: 'NumPy Arrays',          status: 'soon' },
      { slug: 'pandas-dataframes',     title: 'Pandas DataFrames',     status: 'soon' },
      { slug: 'matplotlib-seaborn',    title: 'Matplotlib & Seaborn',  status: 'soon' },
      { slug: 'sklearn-interface',     title: 'Scikit-learn Interface', status: 'soon' },
    ],
  },
  {
    slug: 'data-engineering',
    num: '03',
    title: 'Data Engineering',
    shortTitle: 'Data',
    color: '#1D9E75',
    topics: [
      { slug: 'data-collection',           title: 'Data Collection',            status: 'soon' },
      { slug: 'missing-values',            title: 'Missing Values',             status: 'soon' },
      { slug: 'scaling-and-normalisation', title: 'Scaling & Normalisation',    status: 'soon' },
      { slug: 'encoding-categoricals',     title: 'Encoding Categoricals',      status: 'soon' },
      { slug: 'feature-engineering',       title: 'Feature Engineering',        status: 'soon' },
      { slug: 'train-val-test-split',      title: 'Train / Val / Test Split',   status: 'soon' },
    ],
  },
  {
    slug: 'classical-ml',
    num: '04',
    title: 'Classical Machine Learning',
    shortTitle: 'Classical ML',
    color: '#378ADD',
    topics: [
      { slug: 'what-is-ml',           title: 'What is Machine Learning?', status: 'soon' },
      { slug: 'linear-regression',    title: 'Linear Regression',         status: 'soon' },
      { slug: 'logistic-regression',  title: 'Logistic Regression',       status: 'soon' },
      { slug: 'decision-trees',       title: 'Decision Trees',            status: 'soon' },
      { slug: 'svm',                  title: 'Support Vector Machines',   status: 'soon' },
      { slug: 'knn',                  title: 'K-Nearest Neighbours',      status: 'soon' },
      { slug: 'naive-bayes',          title: 'Naive Bayes',               status: 'soon' },
      { slug: 'random-forest',        title: 'Random Forest',             status: 'soon' },
      { slug: 'gradient-boosting',    title: 'Gradient Boosting',         status: 'soon' },
      { slug: 'xgboost',              title: 'XGBoost',                   status: 'soon' },
      { slug: 'lightgbm',             title: 'LightGBM',                  status: 'soon' },
      { slug: 'kmeans-clustering',    title: 'K-Means Clustering',        status: 'soon' },
      { slug: 'pca',                  title: 'Principal Component Analysis', status: 'soon' },
    ],
  },
  {
    slug: 'evaluation',
    num: '05',
    title: 'Evaluation & Optimisation',
    shortTitle: 'Evaluation',
    color: '#BA7517',
    topics: [
      { slug: 'classification-metrics',     title: 'Classification Metrics',    status: 'soon' },
      { slug: 'regression-metrics',         title: 'Regression Metrics',        status: 'soon' },
      { slug: 'roc-and-auc',               title: 'ROC Curve & AUC',           status: 'soon' },
      { slug: 'cross-validation',           title: 'Cross-Validation',          status: 'soon' },
      { slug: 'bias-variance-tradeoff',     title: 'Bias-Variance Tradeoff',    status: 'soon' },
      { slug: 'hyperparameter-tuning',      title: 'Hyperparameter Tuning',     status: 'soon' },
    ],
  },
  {
    slug: 'deep-learning',
    num: '06',
    title: 'Deep Learning',
    shortTitle: 'Deep Learning',
    color: '#D85A30',
    topics: [
      { slug: 'neural-networks',      title: 'Neural Networks',           status: 'soon' },
      { slug: 'activation-functions', title: 'Activation Functions',      status: 'soon' },
      { slug: 'backpropagation',      title: 'Backpropagation',           status: 'soon' },
      { slug: 'optimisers',           title: 'Optimisers',                status: 'soon' },
      { slug: 'batch-norm-dropout',   title: 'Batch Norm & Dropout',      status: 'soon' },
      { slug: 'cnns',                 title: 'Convolutional Neural Nets', status: 'soon' },
      { slug: 'rnns-and-lstms',       title: 'RNNs & LSTMs',             status: 'soon' },
      { slug: 'transformers',         title: 'Transformers',              status: 'soon' },
    ],
  },
  {
    slug: 'nlp',
    num: '07',
    title: 'Natural Language Processing',
    shortTitle: 'NLP',
    color: '#D4537E',
    topics: [
      { slug: 'tokenisation',          title: 'Tokenisation',             status: 'soon' },
      { slug: 'word-embeddings',       title: 'Word Embeddings',          status: 'soon' },
      { slug: 'bert-and-family',       title: 'BERT & Family',            status: 'soon' },
      { slug: 'fine-tuning',           title: 'Fine-Tuning',              status: 'soon' },
      { slug: 'rag',                   title: 'RAG',                      status: 'soon' },
      { slug: 'prompt-engineering',    title: 'Prompt Engineering',       status: 'soon' },
      { slug: 'llm-agents',            title: 'LLM Agents',               status: 'soon' },
    ],
  },
  {
    slug: 'computer-vision',
    num: '08',
    title: 'Computer Vision',
    shortTitle: 'Vision',
    color: '#0F6E56',
    topics: [
      { slug: 'image-fundamentals',      title: 'Image Fundamentals',       status: 'soon' },
      { slug: 'data-augmentation',       title: 'Data Augmentation',        status: 'soon' },
      { slug: 'object-detection',        title: 'Object Detection',         status: 'soon' },
      { slug: 'semantic-segmentation',   title: 'Semantic Segmentation',    status: 'soon' },
      { slug: 'transfer-learning',       title: 'Transfer Learning',        status: 'soon' },
    ],
  },
  {
    slug: 'generative-ai',
    num: '09',
    title: 'Generative AI',
    shortTitle: 'GenAI',
    color: '#7F77DD',
    topics: [
      { slug: 'what-is-generative-ai', title: 'What is Generative AI?',  status: 'soon' },
      { slug: 'gans',                  title: 'GANs',                    status: 'soon' },
      { slug: 'vaes',                  title: 'Variational Autoencoders', status: 'soon' },
      { slug: 'diffusion-models',      title: 'Diffusion Models',         status: 'soon' },
      { slug: 'llms',                  title: 'Large Language Models',    status: 'soon' },
      { slug: 'rlhf',                  title: 'RLHF & Alignment',        status: 'soon' },
      { slug: 'llm-fine-tuning',       title: 'LLM Fine-Tuning',         status: 'soon' },
      { slug: 'rag-advanced',          title: 'Advanced RAG',             status: 'soon' },
      { slug: 'agents',                title: 'Agents & Tool Use',        status: 'soon' },
    ],
  },
  {
    slug: 'mlops',
    num: '10',
    title: 'MLOps & Production',
    shortTitle: 'MLOps',
    color: '#639922',
    topics: [
      { slug: 'ml-pipelines',           title: 'ML Pipelines',             status: 'soon' },
      { slug: 'experiment-tracking',    title: 'Experiment Tracking',      status: 'soon' },
      { slug: 'model-deployment',       title: 'Model Deployment',         status: 'soon' },
      { slug: 'docker-for-ml',          title: 'Docker for ML',            status: 'soon' },
      { slug: 'kubernetes-serving',     title: 'Kubernetes Serving',       status: 'soon' },
      { slug: 'drift-and-monitoring',   title: 'Drift & Monitoring',       status: 'soon' },
      { slug: 'retraining-pipelines',   title: 'Retraining Pipelines',     status: 'soon' },
    ],
  },
  {
    slug: 'cloud-ml',
    num: '11',
    title: 'Cloud ML Platforms',
    shortTitle: 'Cloud ML',
    color: '#378ADD',
    topics: [
      { slug: 'azure-ml-overview',     title: 'Azure ML Overview',        status: 'soon' },
      { slug: 'azure-ml-pipelines',    title: 'Azure ML Pipelines',       status: 'soon' },
      { slug: 'azure-automl',          title: 'Azure AutoML',             status: 'soon' },
      { slug: 'aws-sagemaker',         title: 'AWS SageMaker',            status: 'soon' },
      { slug: 'gcp-vertex-ai',         title: 'GCP Vertex AI',            status: 'soon' },
      { slug: 'bigquery-ml',           title: 'BigQuery ML',              status: 'soon' },
    ],
  },
]

// ─── Helpers ──────────────────────────────────────────────────────────────────

/** Get a section by its slug. Returns undefined if not found. */
export function getSectionBySlug(slug: string): Section | undefined {
  return AIML_SECTIONS.find((s) => s.slug === slug)
}

/** Get a topic within a section by topic slug. */
export function getTopicBySlug(
  sectionSlug: string,
  topicSlug: string
): Topic | undefined {
  return getSectionBySlug(sectionSlug)?.topics.find((t) => t.slug === topicSlug)
}

/** Get prev and next topics for navigation within a section. */
export function getSectionNav(
  sectionSlug: string,
  topicSlug: string
): { prev: Topic | null; next: Topic | null } {
  const section = getSectionBySlug(sectionSlug)
  if (!section) return { prev: null, next: null }
  const idx = section.topics.findIndex((t) => t.slug === topicSlug)
  return {
    prev: idx > 0 ? section.topics[idx - 1] : null,
    next: idx < section.topics.length - 1 ? section.topics[idx + 1] : null,
  }
}