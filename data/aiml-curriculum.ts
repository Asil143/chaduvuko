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
    slug: 'introduction',
    num: '01',
    title: 'Introduction',
    shortTitle: 'Intro',
    color: '#00e676',
    topics: [
      { slug: 'what-is-ai',      title: 'What is AI? ML, DL and GenAI Explained',           status: 'live' },
      { slug: 'ai-ml-landscape', title: 'The AI/ML Landscape — Tools, Roles, Career Paths',  status: 'live' },
    ],
  },
  {
    slug: 'math-foundations',
    num: '02',
    title: 'Math Foundations',
    shortTitle: 'Math',
    color: '#7F77DD',
    topics: [
      { slug: 'vectors-matrices-tensors',  title: 'Vectors, Matrices and Tensors',                   status: 'live' },
      { slug: 'matrix-multiplication',     title: 'Matrix Multiplication and Linear Transformations', status: 'live' },
      { slug: 'dot-product-similarity',    title: 'Dot Product and Similarity',                       status: 'soon' },
      { slug: 'eigenvalues-eigenvectors',  title: 'Eigenvalues and Eigenvectors',                     status: 'live' },
      { slug: 'derivatives-and-gradients', title: 'Derivatives, Gradients and the Chain Rule',        status: 'live' },
      { slug: 'probability-distributions', title: 'Probability Distributions and Bayes Theorem',      status: 'live' },
      { slug: 'information-theory',        title: 'Information Theory — Entropy and KL Divergence',   status: 'live' },
    ],
  },
  {
    slug: 'programming',
    num: '03',
    title: 'Programming Ecosystem',
    shortTitle: 'Python',
    color: '#888888',
    topics: [
      { slug: 'python-for-ml',      title: 'Python for Machine Learning',  status: 'live' },
      { slug: 'numpy-arrays',       title: 'NumPy Arrays and Broadcasting', status: 'live' },
      { slug: 'pandas-dataframes',  title: 'Pandas for Data Analysis',      status: 'live' },
      { slug: 'matplotlib-seaborn', title: 'Data Visualisation for ML',     status: 'live' },
      { slug: 'sklearn-interface',  title: 'Scikit-learn Interface',        status: 'live' },
    ],
  },
  {
    slug: 'data-engineering',
    num: '04',
    title: 'Data Engineering for ML',
    shortTitle: 'Data Eng',
    color: '#1D9E75',
    topics: [
      { slug: 'data-collection',               title: 'Data Collection — APIs, SQL, Files and Scraping',   status: 'live' },
      { slug: 'data-cleaning',                 title: 'Missing Values, Outliers and Data Cleaning',         status: 'live' },
      { slug: 'feature-scaling',               title: 'Feature Scaling — Standardisation and Normalisation', status: 'live' },
      { slug: 'encoding-categorical-features', title: 'Encoding Categorical Features',                       status: 'live' },
      { slug: 'feature-engineering',           title: 'Feature Engineering and the Sklearn Pipeline',        status: 'live' },
      { slug: 'train-val-test-split',          title: 'Train / Validation / Test Split',                     status: 'live' },
    ],
  },
  {
    slug: 'classical-ml',
    num: '05',
    title: 'Classical Machine Learning',
    shortTitle: 'Classical ML',
    color: '#378ADD',
    topics: [
      { slug: 'what-is-ml',          title: 'What is Machine Learning?',                status: 'live' },
      { slug: 'linear-regression',   title: 'Linear Regression',                        status: 'live' },
      { slug: 'logistic-regression', title: 'Logistic Regression',                      status: 'live' },
      { slug: 'decision-trees',      title: 'Decision Trees',                           status: 'live' },
      { slug: 'svm',                 title: 'Support Vector Machines',                  status: 'live' },
      { slug: 'knn',                 title: 'K-Nearest Neighbours',                     status: 'live' },
      { slug: 'naive-bayes',         title: 'Naive Bayes',                              status: 'live' },
      { slug: 'random-forest',       title: 'Random Forest',                            status: 'live' },
      { slug: 'gradient-boosting',   title: 'Gradient Boosting',                        status: 'live' },
      { slug: 'xgboost',             title: 'XGBoost in Practice',                      status: 'live' },
      { slug: 'lightgbm',            title: 'LightGBM — Fast Gradient Boosting',        status: 'live' },
      { slug: 'kmeans-clustering',   title: 'K-Means Clustering',                       status: 'live' },
      { slug: 'pca',                 title: 'Principal Component Analysis',             status: 'live' },
    ],
  },
  {
    slug: 'evaluation',
    num: '06',
    title: 'Evaluation and Optimisation',
    shortTitle: 'Evaluation',
    color: '#BA7517',
    topics: [
      { slug: 'evaluation-metrics',     title: 'Evaluation Metrics — Beyond Accuracy',                  status: 'live' },
      { slug: 'calibration',            title: 'Calibration — Are Your Probabilities Trustworthy?',     status: 'live' },
      { slug: 'roc-and-auc',            title: 'ROC Curve and AUC',                                    status: 'soon' },
      { slug: 'cross-validation',       title: 'Cross-Validation and the Bias-Variance Tradeoff',      status: 'soon' },
      { slug: 'hyperparameter-tuning',  title: 'Hyperparameter Tuning with Optuna',                    status: 'soon' },
      { slug: 'model-interpretability', title: 'Model Interpretability — SHAP and LIME',               status: 'soon' },
      { slug: 'regression-metrics',     title: 'Regression Metrics — MAE, RMSE, R²',                  status: 'soon' },
    ],
  },
  {
    slug: 'deep-learning',
    num: '07',
    title: 'Deep Learning',
    shortTitle: 'Deep Learning',
    color: '#D85A30',
    topics: [
      { slug: 'neural-networks',      title: 'Neural Networks from Scratch',               status: 'soon' },
      { slug: 'backpropagation',      title: 'Backpropagation — How Neural Networks Learn', status: 'soon' },
      { slug: 'activation-functions', title: 'Activation Functions and Loss Functions',     status: 'soon' },
      { slug: 'optimisers',           title: 'Optimisers — SGD, Adam, AdamW',              status: 'soon' },
      { slug: 'batch-norm-dropout',   title: 'Batch Normalisation and Dropout',             status: 'soon' },
      { slug: 'cnns',                 title: 'CNNs — Meesho Product Image Classification',  status: 'soon' },
      { slug: 'rnns-and-lstms',       title: 'RNNs and LSTMs — Sequence Modelling',        status: 'soon' },
      { slug: 'transformers',         title: 'Transformers and Self-Attention',             status: 'soon' },
    ],
  },
  {
    slug: 'nlp',
    num: '08',
    title: 'Natural Language Processing',
    shortTitle: 'NLP',
    color: '#D4537E',
    topics: [
      { slug: 'tokenisation',       title: 'Tokenisation and Word Embeddings',      status: 'soon' },
      { slug: 'bert-and-family',    title: 'BERT and the Encoder-Only Family',       status: 'soon' },
      { slug: 'fine-tuning',        title: 'Fine-Tuning with PEFT — LoRA and Adapters', status: 'soon' },
      { slug: 'rag',                title: 'RAG — Retrieval-Augmented Generation',   status: 'soon' },
      { slug: 'prompt-engineering', title: 'Prompt Engineering',                     status: 'soon' },
      { slug: 'llm-agents',         title: 'LLM Agents and Tool Use',                status: 'soon' },
    ],
  },
  {
    slug: 'computer-vision',
    num: '09',
    title: 'Computer Vision',
    shortTitle: 'Vision',
    color: '#0F6E56',
    topics: [
      { slug: 'image-fundamentals',    title: 'Image Fundamentals',    status: 'soon' },
      { slug: 'data-augmentation',     title: 'Data Augmentation',     status: 'soon' },
      { slug: 'object-detection',      title: 'Object Detection',      status: 'soon' },
      { slug: 'semantic-segmentation', title: 'Semantic Segmentation', status: 'soon' },
      { slug: 'transfer-learning',     title: 'Transfer Learning',     status: 'soon' },
    ],
  },
  {
    slug: 'generative-ai',
    num: '10',
    title: 'Generative AI',
    shortTitle: 'GenAI',
    color: '#9C27B0',
    topics: [
      { slug: 'what-is-generative-ai', title: 'What is Generative AI?',                  status: 'soon' },
      { slug: 'gans',                  title: 'GANs — Generator vs Discriminator',        status: 'soon' },
      { slug: 'vaes',                  title: 'Variational Autoencoders',                 status: 'soon' },
      { slug: 'diffusion-models',      title: 'Diffusion Models and Stable Diffusion',    status: 'soon' },
      { slug: 'llms',                  title: 'LLMs — Pretraining, RLHF and Scaling Laws', status: 'soon' },
      { slug: 'llm-fine-tuning',       title: 'LLM Fine-Tuning in Practice',              status: 'soon' },
      { slug: 'multimodal',            title: 'Multimodal Models — CLIP and LLaVA',       status: 'soon' },
      { slug: 'rag-advanced',          title: 'Advanced RAG',                              status: 'soon' },
      { slug: 'agents',                title: 'Agents and Tool Use',                       status: 'soon' },
    ],
  },
  {
    slug: 'mlops',
    num: '11',
    title: 'MLOps and Production',
    shortTitle: 'MLOps',
    color: '#639922',
    topics: [
      { slug: 'ml-pipelines',         title: 'ML Pipelines and Feature Stores',         status: 'soon' },
      { slug: 'experiment-tracking',  title: 'Experiment Tracking with MLflow and W&B', status: 'soon' },
      { slug: 'model-deployment',     title: 'Model Deployment — FastAPI, Docker, K8s', status: 'soon' },
      { slug: 'drift-and-monitoring', title: 'Model Monitoring — Drift Detection',       status: 'soon' },
      { slug: 'retraining-pipelines', title: 'Retraining Pipelines',                     status: 'soon' },
      { slug: 'dvc',                  title: 'DVC — Data Version Control',              status: 'soon' },
      { slug: 'ml-system-design',     title: 'ML System Design — End to End',           status: 'soon' },
    ],
  },
  {
    slug: 'cloud-ml',
    num: '12',
    title: 'Cloud ML Platforms',
    shortTitle: 'Cloud ML',
    color: '#4285f4',
    topics: [
      { slug: 'azure-ml',       title: 'Azure ML — Studio, Pipelines and AutoML',    status: 'soon' },
      { slug: 'aws-sagemaker',  title: 'AWS SageMaker — Training Jobs and Pipelines', status: 'soon' },
      { slug: 'gcp-vertex-ai',  title: 'GCP Vertex AI — Pipelines and AutoML',        status: 'soon' },
      { slug: 'mlops-on-cloud', title: 'MLOps on Cloud — CI/CD for ML',               status: 'soon' },
      { slug: 'interview-prep', title: 'Interview Prep — 50 Complete ML Answers',     status: 'soon' },
    ],
  },
]

export function getSectionBySlug(slug: string): Section | undefined {
  return AIML_SECTIONS.find((s) => s.slug === slug)
}

export function getTopicBySlug(sectionSlug: string, topicSlug: string): Topic | undefined {
  return getSectionBySlug(sectionSlug)?.topics.find((t) => t.slug === topicSlug)
}

export function getSectionNav(sectionSlug: string, topicSlug: string): { prev: Topic | null; next: Topic | null } {
  const section = getSectionBySlug(sectionSlug)
  if (!section) return { prev: null, next: null }
  const idx = section.topics.findIndex((t) => t.slug === topicSlug)
  return {
    prev: idx > 0 ? section.topics[idx - 1] : null,
    next: idx < section.topics.length - 1 ? section.topics[idx + 1] : null,
  }
}
