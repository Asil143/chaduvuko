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
  // ─── Sections 8–12: add remaining slugs below as you go ─────────────────
  // 'nlp/...'            () => import('@/content/ai-ml/nlp/...'),
  // 'computer-vision/...' () => import('@/content/ai-ml/computer-vision/...'),
  // 'generative-ai/...'  () => import('@/content/ai-ml/generative-ai/...'),
  // 'mlops/...'          () => import('@/content/ai-ml/mlops/...'),
  // 'cloud-ml/...'       () => import('@/content/ai-ml/cloud-ml/...'),
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
  'classical-ml/linear-regression':                      { title: 'Linear Regression — Swiggy Delivery Time Prediction',  description: 'Build a working predictor from scratch — intuition, math, full code.'           },
  'classical-ml/logistic-regression':                    { title: 'Logistic Regression — Razorpay Fraud Detection',       description: 'Sigmoid function, decision boundaries, classification from scratch.'             },
  'classical-ml/decision-trees':                         { title: 'Decision Trees — Loan Approval at HDFC',               description: 'Gini impurity, information gain, pruning — the foundation of ensembles.'        },
  'classical-ml/svm':                                    { title: 'Support Vector Machines — Margin Maximisation',        description: 'Kernels, the kernel trick, and when SVMs still matter.'                          },
  'classical-ml/knn':                                    { title: 'K-Nearest Neighbours — Similarity-Based Prediction',   description: 'Distance metrics, curse of dimensionality, when KNN works.'                     },
  'classical-ml/naive-bayes':                            { title: 'Naive Bayes — Probabilistic Text Classification',      description: 'Bayes theorem applied to classification — spam filters and documents.'          },
  'classical-ml/random-forest':                          { title: 'Random Forest — Zepto Stock Prediction',               description: 'Bagging, feature importance, out-of-bag evaluation.'                            },
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
