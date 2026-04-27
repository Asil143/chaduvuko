import { notFound } from 'next/navigation';
import type { Metadata } from 'next';

// Key format:
//   Section 1 (no prefix):  'what-is-ai'
//   All other sections:     'math-foundations/vectors-matrices-tensors'
const moduleMap: Record<string, () => Promise<{ default: React.ComponentType }>> = {
  // Section 1 — Introduction
  'what-is-ai':                                           () => import('@/content/ai-ml/what-is-ai'),
  'ai-ml-landscape':                                      () => import('@/content/ai-ml/ai-ml-landscape'),
  // Section 2 — Math Foundations
  'math-foundations/vectors-matrices-tensors':            () => import('@/content/ai-ml/math-foundations/vectors-matrices-tensors'),
  'math-foundations/matrix-multiplication':               () => import('@/content/ai-ml/math-foundations/matrix-multiplication'),
  'math-foundations/dot-product-similarity':              () => import('@/content/ai-ml/math-foundations/dot-product-similarity'),
  'math-foundations/eigenvalues-eigenvectors':            () => import('@/content/ai-ml/math-foundations/eigenvalues-eigenvectors'),
  'math-foundations/derivatives-and-gradients':           () => import('@/content/ai-ml/math-foundations/derivatives-and-gradients'),
  'math-foundations/probability-distributions':           () => import('@/content/ai-ml/math-foundations/probability-distributions'),
  'math-foundations/information-theory':                  () => import('@/content/ai-ml/math-foundations/information-theory'),
  // Section 3 — Programming Ecosystem
  'programming/python-for-ml':                            () => import('@/content/ai-ml/programming/python-for-ml'),
  'programming/numpy-arrays':                             () => import('@/content/ai-ml/programming/numpy-arrays'),
  'programming/pandas-dataframes':                        () => import('@/content/ai-ml/programming/pandas-dataframes'),
  'programming/matplotlib-seaborn':                       () => import('@/content/ai-ml/programming/matplotlib-seaborn'),
  'programming/sklearn-interface':                        () => import('@/content/ai-ml/programming/sklearn-interface'),
  // Section 4 — Data Engineering for ML
  'data-engineering/data-collection':                     () => import('@/content/ai-ml/data-engineering/data-collection'),
  'data-engineering/data-cleaning':                       () => import('@/content/ai-ml/data-engineering/data-cleaning'),
  'data-engineering/feature-scaling':                     () => import('@/content/ai-ml/data-engineering/feature-scaling'),
  'data-engineering/encoding-categorical-features':       () => import('@/content/ai-ml/data-engineering/encoding-categorical-features'),
  'data-engineering/feature-engineering':                 () => import('@/content/ai-ml/data-engineering/feature-engineering'),
  'data-engineering/train-val-test-split':                () => import('@/content/ai-ml/data-engineering/train-val-test-split'),
  // Section 5 — Classical ML
  'classical-ml/what-is-ml':                             () => import('@/content/ai-ml/classical-ml/what-is-ml'),
  'classical-ml/linear-regression':                      () => import('@/content/ai-ml/classical-ml/linear-regression'),
  'classical-ml/logistic-regression':                    () => import('@/content/ai-ml/classical-ml/logistic-regression'),
  'classical-ml/decision-trees':                         () => import('@/content/ai-ml/classical-ml/decision-trees'),
  'classical-ml/svm':                                    () => import('@/content/ai-ml/classical-ml/svm'),
  'classical-ml/knn':                                    () => import('@/content/ai-ml/classical-ml/knn'),
  'classical-ml/naive-bayes':                            () => import('@/content/ai-ml/classical-ml/naive-bayes'),
  'classical-ml/random-forest':                          () => import('@/content/ai-ml/classical-ml/random-forest'),
  'classical-ml/gradient-boosting':                      () => import('@/content/ai-ml/classical-ml/gradient-boosting'),
  'classical-ml/xgboost':                                () => import('@/content/ai-ml/classical-ml/xgboost'),
  'classical-ml/lightgbm':                               () => import('@/content/ai-ml/classical-ml/lightgbm'),
  'classical-ml/kmeans-clustering':                      () => import('@/content/ai-ml/classical-ml/kmeans-clustering'),
  'classical-ml/pca':                                    () => import('@/content/ai-ml/classical-ml/pca'),
  // Section 6 — Evaluation & Optimisation
  'evaluation/evaluation-metrics':                       () => import('@/content/ai-ml/evaluation/evaluation-metrics'),
  'evaluation/calibration':                              () => import('@/content/ai-ml/evaluation/calibration'),
  'evaluation/roc-and-auc':                              () => import('@/content/ai-ml/evaluation/roc-and-auc'),
  'evaluation/cross-validation':                         () => import('@/content/ai-ml/evaluation/cross-validation'),
  'evaluation/hyperparameter-tuning':                    () => import('@/content/ai-ml/evaluation/hyperparameter-tuning'),
  'evaluation/model-interpretability':                   () => import('@/content/ai-ml/evaluation/model-interpretability'),
  'evaluation/regression-metrics':                       () => import('@/content/ai-ml/evaluation/regression-metrics'),
  // Section 7 — Deep Learning
  'deep-learning/neural-networks-from-scratch':          () => import('@/content/ai-ml/deep-learning/neural-networks-from-scratch'),
  'deep-learning/backpropagation':                       () => import('@/content/ai-ml/deep-learning/backpropagation'),
  'deep-learning/activation-functions':                  () => import('@/content/ai-ml/deep-learning/activation-functions'),
  'deep-learning/optimisers':                            () => import('@/content/ai-ml/deep-learning/optimisers'),
  'deep-learning/batch-norm-dropout':                    () => import('@/content/ai-ml/deep-learning/batch-norm-dropout'),
  'deep-learning/cnns-image-classification':             () => import('@/content/ai-ml/deep-learning/cnns-image-classification'),
  'deep-learning/rnns-and-lstms':                        () => import('@/content/ai-ml/deep-learning/rnns-and-lstms'),
  'deep-learning/transformers-and-attention':            () => import('@/content/ai-ml/deep-learning/transformers-and-attention'),
  // Section 8 — NLP
  'nlp/tokenisation-and-embeddings':                     () => import('@/content/ai-ml/nlp/tokenisation-and-embeddings'),
  'nlp/bert-encoder-family':                             () => import('@/content/ai-ml/nlp/bert-encoder-family'),
  'nlp/prompt-engineering':                              () => import('@/content/ai-ml/nlp/prompt-engineering'),
  'nlp/rag-retrieval-augmented-generation':              () => import('@/content/ai-ml/nlp/rag-retrieval-augmented-generation'),
  'nlp/peft-lora-adapters':                              () => import('@/content/ai-ml/nlp/peft-lora-adapters'),
  'nlp/llm-agents-and-tool-use':                         () => import('@/content/ai-ml/nlp/llm-agents-and-tool-use'),
  // Section 9 — Computer Vision
  'computer-vision/image-fundamentals':                  () => import('@/content/ai-ml/computer-vision/image-fundamentals'),
  'computer-vision/transfer-learning':                   () => import('@/content/ai-ml/computer-vision/transfer-learning'),
  'computer-vision/object-detection':                    () => import('@/content/ai-ml/computer-vision/object-detection'),
  'computer-vision/semantic-segmentation':               () => import('@/content/ai-ml/computer-vision/semantic-segmentation'),
  'computer-vision/data-augmentation':                   () => import('@/content/ai-ml/computer-vision/data-augmentation'),
  // Section 10 — Generative AI
  'generative-ai/what-is-generative-ai':                 () => import('@/content/ai-ml/generative-ai/what-is-generative-ai'),
  'generative-ai/variational-autoencoders':              () => import('@/content/ai-ml/generative-ai/variational-autoencoders'),
  'generative-ai/gans-generator-discriminator':          () => import('@/content/ai-ml/generative-ai/gans-generator-discriminator'),
  'generative-ai/diffusion-models':                      () => import('@/content/ai-ml/generative-ai/diffusion-models'),
  'generative-ai/llms-pretraining-rlhf':                 () => import('@/content/ai-ml/generative-ai/llms-pretraining-rlhf'),
  'generative-ai/llm-fine-tuning':                       () => import('@/content/ai-ml/generative-ai/llm-fine-tuning'),
  'generative-ai/advanced-rag':                          () => import('@/content/ai-ml/generative-ai/advanced-rag'),
  'generative-ai/agents-tool-use':                       () => import('@/content/ai-ml/generative-ai/agents-tool-use'),
  'generative-ai/multimodal-models':                     () => import('@/content/ai-ml/generative-ai/multimodal-models'),
  // Section 11 — MLOps
  'mlops/experiment-tracking':                           () => import('@/content/ai-ml/mlops/experiment-tracking'),
  'mlops/ml-pipelines-feature-stores':                   () => import('@/content/ai-ml/mlops/ml-pipelines-feature-stores'),
  'mlops/model-deployment':                              () => import('@/content/ai-ml/mlops/model-deployment'),
  'mlops/model-monitoring':                              () => import('@/content/ai-ml/mlops/model-monitoring'),
  'mlops/retraining-pipelines':                          () => import('@/content/ai-ml/mlops/retraining-pipelines'),
  'mlops/dvc-data-version-control':                      () => import('@/content/ai-ml/mlops/dvc-data-version-control'),
  'mlops/ml-system-design':                              () => import('@/content/ai-ml/mlops/ml-system-design'),
  // Section 12 — Cloud ML
  'cloud-ml/aws-sagemaker':                              () => import('@/content/ai-ml/cloud-ml/aws-sagemaker'),
  'cloud-ml/gcp-vertex-ai':                              () => import('@/content/ai-ml/cloud-ml/gcp-vertex-ai'),
  'cloud-ml/azure-ml':                                   () => import('@/content/ai-ml/cloud-ml/azure-ml'),
  'cloud-ml/mlops-on-cloud':                             () => import('@/content/ai-ml/cloud-ml/mlops-on-cloud'),
};

const moduleMeta: Record<string, { title: string; description: string }> = {
  'what-is-ai':                                           { title: 'What is AI? ML, DL and GenAI Explained',              description: 'The hierarchy from scratch — AI, ML, Deep Learning, and GenAI explained.'          },
  'ai-ml-landscape':                                      { title: 'The AI/ML Landscape — Tools, Roles, Career Paths',    description: 'Every tool, role, and career path in the AI/ML ecosystem mapped clearly.'         },
  'math-foundations/vectors-matrices-tensors':            { title: 'Vectors, Matrices and Tensors',                        description: 'The language every ML algorithm speaks — visual intuition first, formula second.' },
  'math-foundations/matrix-multiplication':               { title: 'Matrix Multiplication and Linear Transformations',     description: 'How data flows through neural network layers — explained visually.'               },
  'math-foundations/dot-product-similarity':              { title: 'Dot Product and Similarity',                           description: 'The operation behind every recommendation engine and attention mechanism.'        },
  'math-foundations/eigenvalues-eigenvectors':            { title: 'Eigenvalues and Eigenvectors',                         description: 'Mathematical foundation of PCA, spectral clustering, and page rank.'             },
  'math-foundations/derivatives-and-gradients':           { title: 'Derivatives, Gradients and the Chain Rule',            description: 'The mathematical engine behind every learning algorithm.'                        },
  'math-foundations/probability-distributions':           { title: 'Probability Distributions and Bayes Theorem',          description: 'How ML models reason under uncertainty.'                                         },
  'math-foundations/information-theory':                  { title: 'Information Theory — Entropy and Cross-Entropy',       description: 'Why loss functions in neural networks look the way they do.'                     },
  'programming/python-for-ml':                            { title: 'Python for Machine Learning',                          description: 'NumPy, Pandas, matplotlib, sklearn — the ML Python stack from scratch.'         },
  'programming/numpy-arrays':                             { title: 'NumPy Arrays and Broadcasting',                        description: 'The backbone of all numerical ML — vectorised operations at scale.'              },
  'programming/pandas-dataframes':                        { title: 'Pandas for Data Analysis',                             description: 'Load, clean, transform and explore datasets with Pandas.'                       },
  'programming/matplotlib-seaborn':                       { title: 'Data Visualisation for ML',                            description: 'Plot distributions, ROC curves, and learning curves.'                           },
  'programming/sklearn-interface':                        { title: 'Scikit-learn Interface',                               description: 'fit, transform, predict, Pipeline — understand the API once, use it everywhere.' },
  'data-engineering/data-collection':                     { title: 'Data Collection — APIs, SQL, Files and Scraping',      description: 'Where ML data actually comes from — production-grade Python.'                    },
  'data-engineering/data-cleaning':                       { title: 'Missing Values, Outliers and Data Cleaning',           description: 'Every imputation strategy, when to use each.'                                    },
  'data-engineering/feature-scaling':                     { title: 'Feature Scaling — Standardisation and Normalisation',  description: 'Why scale matters and which algorithms break without it.'                        },
  'data-engineering/encoding-categorical-features':       { title: 'Encoding Categorical Features',                        description: 'One-hot, ordinal, target encoding — what each does to your data.'               },
  'data-engineering/feature-engineering':                 { title: 'Feature Engineering and the Sklearn Pipeline',         description: 'Create new features and build a single reusable pipeline.'                      },
  'data-engineering/train-val-test-split':                { title: 'Train / Validation / Test Split',                      description: 'Why three splits, data leakage, stratification, time-series exception.'         },
  'classical-ml/what-is-ml':                             { title: 'What is Machine Learning?',                            description: 'The actual idea — what training means, 3 types of ML, 7-step workflow.'        },
  'classical-ml/linear-regression':                      { title: 'Linear Regression — DoorDash Delivery Time Prediction',  description: 'Build a working predictor from scratch — intuition, math, full code.'           },
  'classical-ml/logistic-regression':                    { title: 'Logistic Regression — Stripe Fraud Detection',       description: 'Sigmoid function, decision boundaries, classification from scratch.'             },
  'classical-ml/decision-trees':                         { title: 'Decision Trees — Loan Approval at HDFC',               description: 'Gini impurity, information gain, pruning — the foundation of ensembles.'        },
  'classical-ml/svm':                                    { title: 'Support Vector Machines — Margin Maximisation',        description: 'Kernels, the kernel trick, and when SVMs still matter.'                          },
  'classical-ml/knn':                                    { title: 'K-Nearest Neighbours — Similarity-Based Prediction',   description: 'Distance metrics, curse of dimensionality, when KNN works.'                     },
  'classical-ml/naive-bayes':                            { title: 'Naive Bayes — Probabilistic Text Classification',      description: 'Bayes theorem applied to classification — spam filters and documents.'          },
  'classical-ml/random-forest':                          { title: 'Random Forest — Instacart Stock Prediction',               description: 'Bagging, feature importance, out-of-bag evaluation.'                            },
  'classical-ml/gradient-boosting':                      { title: 'Gradient Boosting — How XGBoost and LightGBM Work',   description: 'Sequential weak learners, residuals, why boosting wins competitions.'             },
  'classical-ml/xgboost':                                { title: 'XGBoost in Practice — End to End',                    description: 'Train, tune, and interpret XGBoost. SHAP values and production deployment.'      },
  'classical-ml/lightgbm':                               { title: 'LightGBM — Fast Gradient Boosting at Scale',          description: 'Leaf-wise growth, histogram splitting, 10× faster than XGBoost.'                 },
  'classical-ml/kmeans-clustering':                      { title: 'K-Means Clustering — Customer Segmentation',          description: 'Finding hidden groups in data without labels.'                                   },
  'classical-ml/pca':                                    { title: 'PCA — Dimensionality Reduction',                       description: 'Turn 100 features into 10 without losing most of the information.'              },
  'evaluation/evaluation-metrics':                       { title: 'Evaluation Metrics — Beyond Accuracy',                 description: 'What accuracy hides. Precision, recall, F1, confusion matrix.'                  },
  'evaluation/calibration':                              { title: 'Calibration — Are Your Probabilities Trustworthy?',    description: 'Reliability diagrams, Brier score, Platt scaling.'                               },
  'evaluation/roc-and-auc':                              { title: 'ROC Curve and AUC — Threshold-Independent Evaluation', description: 'The most trustworthy single number for a classifier.'                           },
  'evaluation/cross-validation':                         { title: 'Cross-Validation and the Bias-Variance Tradeoff',      description: 'K-fold, stratified K-fold, time-series split.'                                  },
  'evaluation/hyperparameter-tuning':                    { title: 'Hyperparameter Tuning with Optuna',                    description: 'From grid search to Bayesian optimisation.'                                      },
  'evaluation/model-interpretability':                   { title: 'Model Interpretability — SHAP and LIME',               description: 'Why your model makes the predictions it does.'                                   },
  'evaluation/regression-metrics':                       { title: 'Regression Metrics — MAE, RMSE, R²',                  description: 'How to measure how wrong a regression model is.'                                },
  'deep-learning/neural-networks-from-scratch':          { title: 'Neural Networks from Scratch',                         description: 'Build a neural network with NumPy only — no black boxes.'                       },
  'deep-learning/backpropagation':                       { title: 'Backpropagation — How Neural Networks Learn',          description: 'The chain rule applied to layers — understood once, never forgotten.'            },
  'deep-learning/activation-functions':                  { title: 'Activation Functions and Loss Functions',              description: 'Why ReLU replaced sigmoid, GELU in Transformers, which loss for which problem.' },
  'deep-learning/optimisers':                            { title: 'Optimisers — SGD, Adam, AdamW',                       description: 'Momentum, adaptive learning rates, weight decay.'                               },
  'deep-learning/batch-norm-dropout':                    { title: 'Batch Normalisation and Dropout',                      description: 'The two regularisation techniques in every modern network.'                      },
  'deep-learning/cnns-image-classification':             { title: 'CNNs and Image Classification',                        description: 'Convolutions, pooling, receptive field — how a network sees images.'             },
  'deep-learning/rnns-and-lstms':                        { title: 'RNNs and LSTMs — Sequence Modelling',                  description: 'Vanishing gradients, gated cells, why Transformers replaced LSTMs.'             },
  'deep-learning/transformers-and-attention':            { title: 'Transformers and Attention Mechanisms',                 description: 'Self-attention, multi-head attention, positional encoding — the full picture.'  },
  // Section 8 — NLP
  'nlp/tokenisation-and-embeddings':                     { title: 'Tokenisation and Word Embeddings',                     description: 'BPE, WordPiece, Word2Vec, GloVe — how text becomes numbers.'                    },
  'nlp/bert-encoder-family':                             { title: 'BERT and the Encoder Family',                          description: 'Masked LM, next sentence prediction, fine-tuning BERT for your task.'          },
  'nlp/prompt-engineering':                              { title: 'Prompt Engineering — Zero, Few, Chain-of-Thought',     description: 'How to get the most out of any LLM without changing its weights.'               },
  'nlp/rag-retrieval-augmented-generation':              { title: 'RAG — Retrieval-Augmented Generation',                 description: 'Vector stores, chunking, retrieval, re-ranking — build a production RAG system.' },
  'nlp/peft-lora-adapters':                              { title: 'PEFT and LoRA — Efficient Fine-Tuning',                description: 'Fine-tune a 7B model on a single GPU with LoRA.'                                },
  'nlp/llm-agents-and-tool-use':                         { title: 'LLM Agents and Tool Use',                              description: 'ReAct, function calling, memory, multi-agent systems.'                          },
  // Section 9 — Computer Vision
  'computer-vision/image-fundamentals':                  { title: 'Image Fundamentals for Computer Vision',               description: 'Pixels, channels, colour spaces, image preprocessing.'                          },
  'computer-vision/transfer-learning':                   { title: 'Transfer Learning — Fine-Tuning Pretrained Models',    description: 'Feature extraction vs full fine-tuning — when to use each.'                     },
  'computer-vision/object-detection':                    { title: 'Object Detection — YOLO, Faster R-CNN',                description: 'Bounding boxes, anchors, IoU, mAP — the full detection pipeline.'               },
  'computer-vision/semantic-segmentation':               { title: 'Semantic Segmentation — U-Net and Beyond',             description: 'Pixel-level classification — FCN, U-Net, DeepLab.'                              },
  'computer-vision/data-augmentation':                   { title: 'Data Augmentation for Computer Vision',                description: 'Geometric and colour augmentation, Albumentations, MixUp, CutMix.'              },
  // Section 10 — Generative AI
  'generative-ai/what-is-generative-ai':                 { title: 'What is Generative AI?',                               description: 'The taxonomy — VAEs, GANs, diffusion, LLMs — and what each generates.'         },
  'generative-ai/variational-autoencoders':              { title: 'Variational Autoencoders — VAEs',                      description: 'Encoder, decoder, latent space, reparameterisation trick.'                      },
  'generative-ai/gans-generator-discriminator':          { title: 'GANs — Generator vs Discriminator',                    description: 'Minimax game, mode collapse, training instability, StyleGAN.'                   },
  'generative-ai/diffusion-models':                      { title: 'Diffusion Models — DDPM and Stable Diffusion',         description: 'Forward noising, reverse denoising, CLIP guidance, latent diffusion.'           },
  'generative-ai/llms-pretraining-rlhf':                 { title: 'LLMs — Pretraining, SFT and RLHF',                    description: 'How GPT-4, Llama and Gemini are actually trained.'                              },
  'generative-ai/llm-fine-tuning':                       { title: 'Fine-Tuning LLMs — Full, LoRA, QLoRA',                 description: 'When to fine-tune, how to prepare data, how to evaluate.'                       },
  'generative-ai/advanced-rag':                          { title: 'Advanced RAG — HyDE, Re-Ranking, GraphRAG',            description: 'Beyond naive RAG — techniques that actually work in production.'                 },
  'generative-ai/agents-tool-use':                       { title: 'AI Agents — Planning, Memory and Tool Use',            description: 'How autonomous agents work, ReAct, CoT, agentic frameworks.'                    },
  'generative-ai/multimodal-models':                     { title: 'Multimodal Models — Vision-Language',                  description: 'CLIP, LLaVA, GPT-4V — models that see and talk.'                               },
  // Section 11 — MLOps
  'mlops/experiment-tracking':                           { title: 'Experiment Tracking with MLflow and W&B',              description: 'Log params, metrics, artefacts — never lose a run again.'                       },
  'mlops/ml-pipelines-feature-stores':                   { title: 'ML Pipelines and Feature Stores',                      description: 'Reproducible training pipelines, online/offline feature serving.'                },
  'mlops/model-deployment':                              { title: 'Model Deployment — REST APIs, Batch, Streaming',       description: 'FastAPI serving, Docker, Kubernetes, latency vs throughput trade-offs.'          },
  'mlops/model-monitoring':                              { title: 'Model Monitoring — Drift, Degradation and Alerts',     description: 'Data drift, concept drift, PSI, evidently — know when your model breaks.'       },
  'mlops/retraining-pipelines':                          { title: 'Retraining Pipelines — Continuous Training',           description: 'Triggers, validation gates, shadow deployment, rollback.'                       },
  'mlops/dvc-data-version-control':                      { title: 'DVC — Data and Model Version Control',                 description: 'Git for data — track datasets, models and experiments.'                         },
  'mlops/ml-system-design':                              { title: 'ML System Design — End to End',                        description: 'Design any ML system from scratch — the framework used in interviews.'          },
  // Section 12 — Cloud ML
  'cloud-ml/aws-sagemaker':                              { title: 'AWS SageMaker — Train, Deploy, Monitor',               description: 'Managed ML on AWS — pipelines, endpoints, feature store.'                       },
  'cloud-ml/gcp-vertex-ai':                              { title: 'GCP Vertex AI — Google\'s ML Platform',               description: 'AutoML, custom training, Vertex Pipelines, Model Registry.'                     },
  'cloud-ml/azure-ml':                                   { title: 'Azure Machine Learning — Microsoft\'s ML Platform',   description: 'Compute clusters, designer, MLflow integration, responsible AI dashboard.'     },
  'cloud-ml/mlops-on-cloud':                             { title: 'MLOps on Cloud — Patterns and Anti-Patterns',          description: 'Cloud-agnostic MLOps — CI/CD for ML, infra as code, cost control.'              },
};

export function generateStaticParams() {
  return Object.keys(moduleMap).map(key => ({
    slug: key.split('/'),
  }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string[] };
}): Promise<Metadata> {
  const key = params.slug.join('/');
  const meta = moduleMeta[key];
  if (!meta) return { title: 'AI & ML | Chaduvuko' };
  return {
    title: `${meta.title} | AI & ML | Chaduvuko`,
    description: meta.description,
  };
}

export default async function AIMLModulePage({
  params,
}: {
  params: { slug: string[] };
}) {
  const key = params.slug.join('/');
  const loader = moduleMap[key];
  if (!loader) notFound();
  const { default: Content } = await loader();
  return <Content />;
}
