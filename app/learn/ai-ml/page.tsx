'use client'

import { useState } from 'react'
import Link from 'next/link'
import { LearnLayout } from '@/components/content/LearnLayout'

type SectionFilter = 'all' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10' | '11' | '12'

interface Module {
  num: string
  title: string
  href?: string
  readTime: string
  xp: number
  status: 'live' | 'soon'
  section: number
  description: string
  topics: string[]
  color: string
}

const sectionColors: Record<number, string> = {
  1:  '#00e676',
  2:  '#7F77DD',
  3:  '#a0a0b0',
  4:  '#1D9E75',
  5:  '#378ADD',
  6:  '#BA7517',
  7:  '#D85A30',
  8:  '#D4537E',
  9:  '#0F6E56',
  10: '#9C27B0',
  11: '#639922',
  12: '#4285f4',
}

const sectionInfo = [
  { id: 1,  title: 'Introduction'               },
  { id: 2,  title: 'Math Foundations'            },
  { id: 3,  title: 'Programming Ecosystem'       },
  { id: 4,  title: 'Data Engineering for ML'     },
  { id: 5,  title: 'Classical Machine Learning'  },
  { id: 6,  title: 'Evaluation and Optimisation' },
  { id: 7,  title: 'Deep Learning'               },
  { id: 8,  title: 'Natural Language Processing' },
  { id: 9,  title: 'Computer Vision'             },
  { id: 10, title: 'Generative AI'               },
  { id: 11, title: 'MLOps and Production'        },
  { id: 12, title: 'Cloud ML Platforms'          },
]

const modules: Module[] = [
  // ── Section 1 — Introduction ──────────────────────────────────────────────
  {
    num: '01', section: 1, color: sectionColors[1], status: 'live', xp: 100,
    readTime: '20–25 min',
    href: '/learn/ai-ml/what-is-ai',
    title: 'What is AI? ML, DL and GenAI Explained',
    description: 'The hierarchy explained from scratch — what AI, ML, Deep Learning, and Generative AI actually mean, how they relate, and why everyone gets them confused.',
    topics: ['AI', 'ML', 'DL', 'GenAI', 'Hierarchy'],
  },
  {
    num: '02', section: 1, color: sectionColors[1], status: 'live', xp: 100,
    readTime: '25 min',
    href: '/learn/ai-ml/ai-ml-landscape',
    title: 'The AI/ML Landscape — Tools, Roles, and Career Paths',
    description: 'Every tool, every role, every career path in the AI/ML ecosystem mapped clearly. Know exactly where you fit before you write a single line of code.',
    topics: ['Tools map', 'Roles', 'Salaries', 'Career paths'],
  },

  // ── Section 2 — Math Foundations ─────────────────────────────────────────
  {
    num: '03', section: 2, color: sectionColors[2], status: 'live', xp: 100,
    readTime: '35 min',
    href: '/learn/ai-ml/math-foundations/vectors-matrices-tensors',
    title: 'Vectors, Matrices and Tensors',
    description: 'The language every ML algorithm speaks. From a single number to multi-dimensional arrays — with visual intuition first, formula second.',
    topics: ['Vectors', 'Matrices', 'Tensors', 'Dot product'],
  },
  {
    num: '04', section: 2, color: sectionColors[2], status: 'live', xp: 100,
    readTime: '30 min',
    href: '/learn/ai-ml/math-foundations/matrix-multiplication',
    title: 'Matrix Multiplication and Linear Transformations',
    description: 'How data flows through neural network layers. One of the most important operations in all of ML — explained visually before mathematically.',
    topics: ['Matrix mult', 'Transformations', 'SVD'],
  },
  {
    num: '05', section: 2, color: sectionColors[2], status: 'live', xp: 100,
    readTime: '25 min',
    href: '/learn/ai-ml/math-foundations/dot-product-similarity',
    title: 'Dot Product and Similarity',
    description: 'The operation behind every recommendation engine, embedding search, and attention mechanism. Cosine similarity, projections, and geometric intuition.',
    topics: ['Dot product', 'Cosine similarity', 'Projections', 'Embeddings'],
  },
  {
    num: '06', section: 2, color: sectionColors[2], status: 'live', xp: 100,
    readTime: '30 min',
    href: '/learn/ai-ml/math-foundations/eigenvalues-eigenvectors',
    title: 'Eigenvalues and Eigenvectors',
    description: 'The mathematical foundation of PCA, spectral clustering, and page rank. What eigenvectors are, why they matter, and how to compute them.',
    topics: ['Eigenvalues', 'Eigenvectors', 'PCA preview', 'Decomposition'],
  },
  {
    num: '07', section: 2, color: sectionColors[2], status: 'live', xp: 100,
    readTime: '35 min',
    href: '/learn/ai-ml/math-foundations/derivatives-and-gradients',
    title: 'Derivatives, Gradients and the Chain Rule',
    description: 'The mathematical engine behind every learning algorithm. Understand gradient descent before you ever run model.fit().',
    topics: ['Derivatives', 'Gradients', 'Chain rule', 'Backprop preview'],
  },
  {
    num: '08', section: 2, color: sectionColors[2], status: 'live', xp: 100,
    readTime: '40 min',
    href: '/learn/ai-ml/math-foundations/probability-distributions',
    title: 'Probability Distributions and Bayes Theorem',
    description: 'How ML models reason under uncertainty. Normal distribution, Bernoulli, Poisson, and why Bayes theorem appears in almost every algorithm.',
    topics: ['Distributions', 'Bayes', 'MLE', 'MAP'],
  },
  {
    num: '09', section: 2, color: sectionColors[2], status: 'live', xp: 100,
    readTime: '30 min',
    href: '/learn/ai-ml/math-foundations/information-theory',
    title: 'Information Theory — Entropy, Cross-Entropy and KL Divergence',
    description: 'Why loss functions in neural networks look the way they do. The information theory behind cross-entropy loss explained from scratch.',
    topics: ['Entropy', 'Cross-entropy', 'KL divergence'],
  },

  // ── Section 3 — Programming Ecosystem ────────────────────────────────────
  {
    num: '10', section: 3, color: sectionColors[3], status: 'live', xp: 100,
    readTime: '60 min',
    href: '/learn/ai-ml/programming/python-for-ml',
    title: 'Python for Machine Learning',
    description: 'Not Python 101. Python for ML — NumPy vectorisation, Pandas DataFrames, matplotlib visualisation, and the sklearn interface that every algorithm shares.',
    topics: ['NumPy', 'Pandas', 'Matplotlib', 'sklearn'],
  },
  {
    num: '11', section: 3, color: sectionColors[3], status: 'live', xp: 100,
    readTime: '45 min',
    href: '/learn/ai-ml/programming/numpy-arrays',
    title: 'NumPy Arrays and Broadcasting',
    description: 'The backbone of all numerical ML. Arrays, indexing, slicing, broadcasting, and vectorised operations that replace for loops at scale.',
    topics: ['Arrays', 'Broadcasting', 'Vectorisation', 'Indexing'],
  },
  {
    num: '12', section: 3, color: sectionColors[3], status: 'live', xp: 100,
    readTime: '50 min',
    href: '/learn/ai-ml/programming/pandas-dataframes',
    title: 'Pandas for Data Analysis',
    description: 'Load, clean, transform and explore datasets. GroupBy, merge, pivot, apply — the operations every ML project starts with.',
    topics: ['DataFrames', 'GroupBy', 'Merge', 'EDA'],
  },
  {
    num: '13', section: 3, color: sectionColors[3], status: 'live', xp: 100,
    readTime: '40 min',
    href: '/learn/ai-ml/programming/matplotlib-seaborn',
    title: 'Data Visualisation for ML',
    description: 'Plot distributions, correlations, confusion matrices, ROC curves, and learning curves. See what is happening in your data before you model it.',
    topics: ['Matplotlib', 'Seaborn', 'Plotly', 'EDA charts'],
  },
  {
    num: '14', section: 3, color: sectionColors[3], status: 'live', xp: 100,
    readTime: '35 min',
    href: '/learn/ai-ml/programming/sklearn-interface',
    title: 'Scikit-learn Interface',
    description: 'The API every sklearn algorithm shares. fit, transform, predict, Pipeline, ColumnTransformer — understand the interface once and every algorithm becomes obvious.',
    topics: ['fit', 'predict', 'Pipeline', 'API patterns'],
  },

  // ── Section 4 — Data Engineering for ML ──────────────────────────────────
  {
    num: '15', section: 4, color: sectionColors[4], status: 'live', xp: 100,
    readTime: '55 min',
    href: '/learn/ai-ml/data-engineering/data-collection',
    title: 'Data Collection — APIs, SQL, Files and Scraping',
    description: 'Where ML data actually comes from. Pull from REST APIs, query databases, read Parquet files, and scrape web data — all with production-grade Python.',
    topics: ['REST APIs', 'SQL', 'Parquet', 'Web scraping'],
  },
  {
    num: '16', section: 4, color: sectionColors[4], status: 'live', xp: 100,
    readTime: '50 min',
    href: '/learn/ai-ml/data-engineering/data-cleaning',
    title: 'Missing Values, Outliers and Data Cleaning',
    description: 'The step that determines whether your model works or fails silently. Every imputation strategy, when to use each, and what breaks when you skip this.',
    topics: ['Missing values', 'Outliers', 'Imputation', 'Cleaning'],
  },
  {
    num: '17', section: 4, color: sectionColors[4], status: 'live', xp: 100,
    readTime: '35 min',
    href: '/learn/ai-ml/data-engineering/feature-scaling',
    title: 'Feature Scaling — Standardisation and Normalisation',
    description: 'Why scale matters, what StandardScaler and MinMaxScaler actually do, and which algorithms break without scaling.',
    topics: ['StandardScaler', 'MinMaxScaler', 'RobustScaler'],
  },
  {
    num: '18', section: 4, color: sectionColors[4], status: 'live', xp: 100,
    readTime: '40 min',
    href: '/learn/ai-ml/data-engineering/encoding-categorical-features',
    title: 'Encoding Categorical Features',
    description: 'One-hot encoding, ordinal encoding, target encoding — what each one does to your data and when each one is the right choice.',
    topics: ['One-hot', 'Ordinal', 'Target encoding', 'OHE'],
  },
  {
    num: '19', section: 4, color: sectionColors[4], status: 'live', xp: 100,
    readTime: '50 min',
    href: '/learn/ai-ml/data-engineering/feature-engineering',
    title: 'Feature Engineering and the Sklearn Pipeline',
    description: 'Create new features, combine transformers, and build a single reusable pipeline that preprocesses and models together.',
    topics: ['Feature creation', 'Pipeline', 'ColumnTransformer'],
  },
  {
    num: '20', section: 4, color: sectionColors[4], status: 'soon', xp: 100,
    readTime: '30 min',
    title: 'Train / Validation / Test Split',
    description: 'Why three splits, not two. Holdout sets, stratified splits, data leakage across splits, and the time-series exception where random splits break everything.',
    topics: ['Train split', 'Validation', 'Holdout', 'Stratified', 'Leakage'],
  },

  // ── Section 5 — Classical Machine Learning ────────────────────────────────
  {
    num: '21', section: 5, color: sectionColors[5], status: 'live', xp: 100,
    readTime: '18–22 min',
    href: '/learn/ai-ml/classical-ml/what-is-ml',
    title: 'What is Machine Learning?',
    description: 'Not the Wikipedia definition. The actual idea — what training means mechanically, the 3 types of ML, the 7-step workflow, and 12 key terms defined once and for all.',
    topics: ['Supervised', 'Unsupervised', 'RL', 'Training', 'Workflow'],
  },
  {
    num: '22', section: 5, color: sectionColors[5], status: 'live', xp: 150,
    readTime: '30–35 min',
    href: '/learn/ai-ml/classical-ml/linear-regression',
    title: 'Linear Regression — Swiggy Delivery Time Prediction',
    description: 'The first ML algorithm. Build a working Swiggy delivery time predictor from scratch — full intuition, math, code, 6 real errors, and a 5-day job walkthrough.',
    topics: ['Regression', 'OLS', 'Gradient descent', 'sklearn'],
  },
  {
    num: '23', section: 5, color: sectionColors[5], status: 'live', xp: 100,
    readTime: '25–30 min',
    href: '/learn/ai-ml/classical-ml/logistic-regression',
    title: 'Logistic Regression — Razorpay Fraud Detection',
    description: 'When the output is a category, not a number. Sigmoid function, decision boundaries, and why logistic regression is still the first thing you try on classification problems.',
    topics: ['Classification', 'Sigmoid', 'Log-odds', 'Threshold'],
  },
  {
    num: '24', section: 5, color: sectionColors[5], status: 'live', xp: 100,
    readTime: '30 min',
    href: '/learn/ai-ml/classical-ml/decision-trees',
    title: 'Decision Trees — Loan Approval at HDFC',
    description: 'The algorithm that thinks in if-then questions. Gini impurity, information gain, pruning, and why decision trees are the foundation of every ensemble method.',
    topics: ['Trees', 'Gini', 'Info gain', 'Pruning'],
  },
  {
    num: '25', section: 5, color: sectionColors[5], status: 'soon', xp: 100,
    readTime: '30 min',
    title: 'Support Vector Machines — Margin Maximisation',
    description: 'The algorithm that finds the widest possible boundary between classes. Kernels, the kernel trick, and why SVMs still matter for small high-dimensional datasets.',
    topics: ['SVM', 'Margin', 'Kernels', 'Hyperplane'],
  },
  {
    num: '26', section: 5, color: sectionColors[5], status: 'soon', xp: 100,
    readTime: '25 min',
    title: 'K-Nearest Neighbours — Similarity-Based Prediction',
    description: 'The simplest possible ML algorithm — predict based on what your neighbours look like. Distance metrics, the curse of dimensionality, and when KNN actually works.',
    topics: ['KNN', 'Distance', 'Euclidean', 'Curse of dimensionality'],
  },
  {
    num: '27', section: 5, color: sectionColors[5], status: 'soon', xp: 100,
    readTime: '25 min',
    title: 'Naive Bayes — Probabilistic Text Classification',
    description: 'Bayes theorem applied to classification. Why the naive independence assumption works surprisingly well for spam filters and document classification.',
    topics: ['Naive Bayes', 'Bayes theorem', 'Probabilistic', 'Text classification'],
  },
  {
    num: '28', section: 5, color: sectionColors[5], status: 'live', xp: 100,
    readTime: '25 min',
    href: '/learn/ai-ml/classical-ml/random-forest',
    title: 'Random Forest — Zepto Stock Prediction',
    description: 'Bagging + random features = a model that beats most others on tabular data. Feature importance, out-of-bag evaluation, and hyperparameter intuition.',
    topics: ['Bagging', 'Ensemble', 'Feature importance', 'OOB'],
  },
  {
    num: '29', section: 5, color: sectionColors[5], status: 'soon', xp: 100,
    readTime: '35 min',
    title: 'Gradient Boosting — How XGBoost and LightGBM Work',
    description: 'The most powerful classical ML algorithm family. Sequential weak learners, residuals, and why gradient boosting wins almost every tabular ML competition.',
    topics: ['Boosting', 'Residuals', 'Weak learners', 'Shrinkage'],
  },
  {
    num: '30', section: 5, color: sectionColors[5], status: 'soon', xp: 100,
    readTime: '40 min',
    title: 'XGBoost in Practice — End to End',
    description: 'Train, tune, and interpret XGBoost on a real dataset. Regularisation parameters, early stopping, SHAP values, and production deployment.',
    topics: ['XGBoost', 'SHAP', 'Regularisation', 'Early stopping'],
  },
  {
    num: '31', section: 5, color: sectionColors[5], status: 'soon', xp: 100,
    readTime: '35 min',
    title: 'LightGBM — Fast Gradient Boosting at Scale',
    description: 'Microsoft\'s answer to XGBoost. Leaf-wise tree growth, histogram-based splitting, and why LightGBM trains 10x faster on large datasets.',
    topics: ['LightGBM', 'Leaf-wise', 'Histogram', 'GBDT'],
  },
  {
    num: '32', section: 5, color: sectionColors[5], status: 'soon', xp: 100,
    readTime: '25 min',
    title: 'K-Means Clustering — Customer Segmentation',
    description: 'Finding hidden groups in data without labels. Inertia, elbow method, silhouette scores, and when clustering is and isn\'t the right approach.',
    topics: ['Clustering', 'K-Means', 'Silhouette', 'Elbow'],
  },
  {
    num: '33', section: 5, color: sectionColors[5], status: 'soon', xp: 100,
    readTime: '30 min',
    title: 'PCA — Dimensionality Reduction',
    description: 'Turn 100 features into 10 without losing most of the information. Explained variance, scree plots, and when PCA helps and when it hurts.',
    topics: ['PCA', 'Variance', 'Components', 'Dimensionality'],
  },

  // ── Section 6 — Evaluation & Optimisation ────────────────────────────────
  {
    num: '34', section: 6, color: sectionColors[6], status: 'soon', xp: 100,
    readTime: '30 min',
    title: 'Classification Metrics — Precision, Recall, F1, AUC',
    description: 'What accuracy hides, and what every other metric reveals. The confusion matrix explained from scratch, with Razorpay fraud detection as the running example.',
    topics: ['Precision', 'Recall', 'F1', 'ROC', 'AUC'],
  },
  {
    num: '35', section: 6, color: sectionColors[6], status: 'soon', xp: 100,
    readTime: '20 min',
    title: 'Regression Metrics — MAE, RMSE, R²',
    description: 'How to measure how wrong your regression model is — and which metric to report to which audience. Stakeholder-ready interpretations included.',
    topics: ['MAE', 'RMSE', 'R²', 'MAPE'],
  },
  {
    num: '36', section: 6, color: sectionColors[6], status: 'soon', xp: 100,
    readTime: '25 min',
    title: 'ROC Curve and AUC — Threshold-Independent Evaluation',
    description: 'Why ROC-AUC is the most trustworthy single number for a classifier. How the curve is constructed, what the area means, and when to use PR-AUC instead.',
    topics: ['ROC', 'AUC', 'PR curve', 'Threshold'],
  },
  {
    num: '37', section: 6, color: sectionColors[6], status: 'soon', xp: 100,
    readTime: '30 min',
    title: 'Cross-Validation and the Bias-Variance Tradeoff',
    description: 'Why train/test split alone is not enough. K-fold, stratified K-fold, time-series split, and the bias-variance tradeoff visualised clearly.',
    topics: ['K-fold', 'Stratified', 'Bias-variance', 'Overfitting'],
  },
  {
    num: '38', section: 6, color: sectionColors[6], status: 'soon', xp: 100,
    readTime: '35 min',
    title: 'Hyperparameter Tuning with Optuna',
    description: 'From grid search to Bayesian optimisation. How Optuna works, when to use it, and how to tune any model without wasting GPU hours.',
    topics: ['Optuna', 'Bayesian', 'Grid search', 'Pruning'],
  },
  {
    num: '39', section: 6, color: sectionColors[6], status: 'soon', xp: 100,
    readTime: '35 min',
    title: 'Model Interpretability — SHAP and LIME',
    description: 'Why your model makes the predictions it does. SHAP values for any model, LIME for local explanations, and how to present findings to non-technical stakeholders.',
    topics: ['SHAP', 'LIME', 'Feature importance', 'XAI'],
  },

  // ── Section 7 — Deep Learning ─────────────────────────────────────────────
  {
    num: '40', section: 7, color: sectionColors[7], status: 'soon', xp: 100,
    readTime: '45 min',
    title: 'Neural Networks from Scratch',
    description: 'Build a neural network from nothing but NumPy. Layers, weights, activations, forward pass — no black boxes, every line of code explained.',
    topics: ['Neurons', 'Layers', 'Weights', 'Forward pass'],
  },
  {
    num: '41', section: 7, color: sectionColors[7], status: 'soon', xp: 100,
    readTime: '40 min',
    title: 'Backpropagation — How Neural Networks Learn',
    description: 'The chain rule applied to a network of layers. Gradients flow backward, weights update, the network gets better. Understood once, never forgotten.',
    topics: ['Backprop', 'Chain rule', 'Gradients', 'Weight updates'],
  },
  {
    num: '42', section: 7, color: sectionColors[7], status: 'soon', xp: 100,
    readTime: '30 min',
    title: 'Activation Functions and Loss Functions',
    description: 'Why ReLU replaced sigmoid, what GELU is doing in Transformers, and which loss function to use for which problem. The full reference.',
    topics: ['ReLU', 'GELU', 'Softmax', 'Cross-entropy loss'],
  },
  {
    num: '43', section: 7, color: sectionColors[7], status: 'soon', xp: 100,
    readTime: '30 min',
    title: 'Optimisers — SGD, Adam, AdamW',
    description: 'How neural networks update their weights. Momentum, adaptive learning rates, weight decay — and why Adam is the default for almost everything.',
    topics: ['SGD', 'Adam', 'AdamW', 'Learning rate'],
  },
  {
    num: '44', section: 7, color: sectionColors[7], status: 'soon', xp: 100,
    readTime: '25 min',
    title: 'Batch Normalisation and Dropout',
    description: 'Two techniques that made deep networks trainable. What batch norm actually normalises, why dropout works as an ensemble method, and when to use each.',
    topics: ['Batch norm', 'Dropout', 'Regularisation', 'Training stability'],
  },
  {
    num: '45', section: 7, color: sectionColors[7], status: 'soon', xp: 100,
    readTime: '50 min',
    title: 'CNNs — Meesho Product Image Classification',
    description: 'Convolutions, filters, pooling, feature maps, and the ResNet skip connection that let neural networks go from 5 layers to 1000. Full PyTorch code.',
    topics: ['CNN', 'Conv', 'Pooling', 'ResNet', 'Transfer learning'],
  },
  {
    num: '46', section: 7, color: sectionColors[7], status: 'soon', xp: 100,
    readTime: '40 min',
    title: 'RNNs and LSTMs — Sequence Modelling',
    description: 'When order matters. The vanishing gradient problem, LSTM gates (input/forget/output/cell state), and when RNNs are still the right choice over Transformers.',
    topics: ['RNN', 'LSTM', 'GRU', 'Sequences', 'Vanishing gradient'],
  },
  {
    num: '47', section: 7, color: sectionColors[7], status: 'soon', xp: 100,
    readTime: '50 min',
    title: 'Transformers and Self-Attention',
    description: 'The architecture behind GPT, BERT, and every modern LLM. Query-Key-Value attention, multi-head attention, positional encoding — built up from scratch.',
    topics: ['Attention', 'QKV', 'Multi-head', 'Positional encoding'],
  },

  // ── Section 8 — Natural Language Processing ───────────────────────────────
  {
    num: '48', section: 8, color: sectionColors[8], status: 'soon', xp: 100,
    readTime: '35 min',
    title: 'Tokenisation and Word Embeddings',
    description: 'How text becomes numbers. BPE, WordPiece, SentencePiece tokenisers explained. Word2Vec, GloVe, and contextual embeddings — why each one exists.',
    topics: ['Tokenisation', 'BPE', 'Word2Vec', 'Embeddings'],
  },
  {
    num: '49', section: 8, color: sectionColors[8], status: 'soon', xp: 100,
    readTime: '40 min',
    title: 'BERT and the Encoder-Only Family',
    description: 'Masked language modelling, next sentence prediction, fine-tuning on downstream tasks. The model that changed NLP — still powering classification and NER.',
    topics: ['BERT', 'MLM', 'Fine-tuning', 'RoBERTa'],
  },
  {
    num: '50', section: 8, color: sectionColors[8], status: 'soon', xp: 100,
    readTime: '40 min',
    title: 'Fine-Tuning with PEFT — LoRA and Adapters',
    description: 'Tune less than 1% of a model\'s parameters and get 95% of the performance. LoRA, adapters, and prefix tuning — when and how to use each.',
    topics: ['LoRA', 'PEFT', 'Adapters', 'Fine-tuning'],
  },
  {
    num: '51', section: 8, color: sectionColors[8], status: 'soon', xp: 100,
    readTime: '45 min',
    title: 'RAG — Retrieval-Augmented Generation',
    description: 'Give any LLM external memory. Vector databases, semantic search, chunking strategies, and the full RAG pipeline from document to answer.',
    topics: ['RAG', 'Vector DB', 'FAISS', 'Semantic search'],
  },
  {
    num: '52', section: 8, color: sectionColors[8], status: 'soon', xp: 100,
    readTime: '30 min',
    title: 'Prompt Engineering',
    description: 'Zero-shot, few-shot, chain-of-thought, ReAct — the patterns that consistently improve LLM outputs. With real before/after examples for every technique.',
    topics: ['Zero-shot', 'Few-shot', 'CoT', 'ReAct'],
  },
  {
    num: '53', section: 8, color: sectionColors[8], status: 'soon', xp: 100,
    readTime: '40 min',
    title: 'LLM Agents and Tool Use',
    description: 'When LLMs call functions, search the web, write and run code, and plan multi-step tasks. The architecture behind every AI agent.',
    topics: ['Agents', 'Tool use', 'Function calling', 'Planning'],
  },

  // ── Section 9 — Computer Vision ──────────────────────────────────────────
  {
    num: '54', section: 9, color: sectionColors[9], status: 'soon', xp: 100,
    readTime: '30 min',
    title: 'Image Fundamentals — Pixels, Channels and Tensors',
    description: 'How computers see images. Pixel values, colour channels, image tensors, normalisation, and the preprocessing pipeline every vision model expects.',
    topics: ['Pixels', 'RGB channels', 'Image tensors', 'Normalisation'],
  },
  {
    num: '55', section: 9, color: sectionColors[9], status: 'soon', xp: 100,
    readTime: '25 min',
    title: 'Data Augmentation — Training on Limited Image Data',
    description: 'How to multiply your image dataset without collecting more data. Flips, crops, colour jitter, mixup, cutout — and how each one affects what the model learns.',
    topics: ['Augmentation', 'Flips', 'Mixup', 'Cutout'],
  },
  {
    num: '56', section: 9, color: sectionColors[9], status: 'soon', xp: 100,
    readTime: '40 min',
    title: 'Object Detection — YOLO and Feature Pyramids',
    description: 'Detect and localise multiple objects in one pass. Anchor boxes, IoU, non-maximum suppression, and why YOLO became the production standard.',
    topics: ['YOLO', 'Anchor boxes', 'IoU', 'NMS'],
  },
  {
    num: '57', section: 9, color: sectionColors[9], status: 'soon', xp: 100,
    readTime: '35 min',
    title: 'Semantic Segmentation — Pixel-Level Classification',
    description: 'Label every pixel in an image. U-Net architecture, skip connections, and how segmentation powers medical imaging and autonomous vehicles.',
    topics: ['Segmentation', 'U-Net', 'Skip connections', 'Pixel labels'],
  },
  {
    num: '58', section: 9, color: sectionColors[9], status: 'soon', xp: 100,
    readTime: '35 min',
    title: 'Transfer Learning — Fine-Tuning Pretrained Vision Models',
    description: 'Get ImageNet-level features without ImageNet-level compute. Feature extraction vs fine-tuning, layer freezing, and choosing the right backbone.',
    topics: ['Transfer learning', 'Fine-tuning', 'Backbone', 'Feature extraction'],
  },

  // ── Section 10 — Generative AI ────────────────────────────────────────────
  {
    num: '59', section: 10, color: sectionColors[10], status: 'soon', xp: 100,
    readTime: '25 min',
    title: 'What is Generative AI?',
    description: 'The shift from judging to creating. GANs, VAEs, diffusion, and LLMs — what makes each one generative, and when each one is the right architecture.',
    topics: ['Generative', 'Discriminative', 'Architecture overview'],
  },
  {
    num: '60', section: 10, color: sectionColors[10], status: 'soon', xp: 100,
    readTime: '35 min',
    title: 'GANs — Generator vs Discriminator',
    description: 'Two networks in adversarial competition. Mode collapse, training instability, Wasserstein distance — the honest account of what makes GANs hard to train.',
    topics: ['GAN', 'Generator', 'Discriminator', 'DCGAN'],
  },
  {
    num: '61', section: 10, color: sectionColors[10], status: 'soon', xp: 100,
    readTime: '30 min',
    title: 'Variational Autoencoders — Learning Latent Representations',
    description: 'Encode data into a structured latent space and decode it back. The reparameterisation trick, KL divergence loss, and why VAEs enable controllable generation.',
    topics: ['VAE', 'Latent space', 'Reparameterisation', 'ELBO'],
  },
  {
    num: '62', section: 10, color: sectionColors[10], status: 'soon', xp: 100,
    readTime: '45 min',
    title: 'Diffusion Models and Stable Diffusion',
    description: 'Forward noise, reverse denoising, DDPM, DDIM, latent diffusion, classifier-free guidance. How Stable Diffusion generates photorealistic images from text.',
    topics: ['Diffusion', 'DDPM', 'Latent diffusion', 'ControlNet'],
  },
  {
    num: '63', section: 10, color: sectionColors[10], status: 'soon', xp: 100,
    readTime: '50 min',
    title: 'LLMs — Pretraining, RLHF, and Scaling Laws',
    description: 'How GPT, Claude, and Gemini are built. Next-token prediction at scale, RLHF alignment, DPO, instruction tuning, and the laws that predict capability.',
    topics: ['LLMs', 'RLHF', 'DPO', 'Scaling laws', 'Pretraining'],
  },
  {
    num: '64', section: 10, color: sectionColors[10], status: 'soon', xp: 100,
    readTime: '55 min',
    title: 'LLM Fine-Tuning in Practice',
    description: 'When to fine-tune vs RAG vs prompt. Full LoRA fine-tuning walkthrough on a real dataset using HuggingFace Transformers and PEFT.',
    topics: ['Fine-tuning', 'LoRA', 'HuggingFace', 'PEFT'],
  },
  {
    num: '65', section: 10, color: sectionColors[10], status: 'soon', xp: 100,
    readTime: '40 min',
    title: 'Multimodal Models — CLIP, LLaVA, and Vision-Language',
    description: 'Models that see and understand images and text together. CLIP for zero-shot image classification, LLaVA for visual question answering.',
    topics: ['Multimodal', 'CLIP', 'LLaVA', 'Vision-language'],
  },
  {
    num: '66', section: 10, color: sectionColors[10], status: 'soon', xp: 100,
    readTime: '40 min',
    title: 'Advanced RAG — Reranking, Hybrid Search and Evaluation',
    description: 'Beyond naive RAG. Reranking retrieved chunks, hybrid dense-sparse search, RAG evaluation metrics, and the patterns that separate production RAG from toy RAG.',
    topics: ['Reranking', 'Hybrid search', 'RAG eval', 'Production RAG'],
  },
  {
    num: '67', section: 10, color: sectionColors[10], status: 'soon', xp: 100,
    readTime: '40 min',
    title: 'Agents and Tool Use — Building Autonomous AI Systems',
    description: 'LLMs that plan, use tools, and execute multi-step tasks autonomously. ReAct, tool calling, memory, and the architecture patterns behind production AI agents.',
    topics: ['Agents', 'ReAct', 'Tool calling', 'Planning', 'Memory'],
  },

  // ── Section 11 — MLOps & Production ──────────────────────────────────────
  {
    num: '68', section: 11, color: sectionColors[11], status: 'soon', xp: 100,
    readTime: '45 min',
    title: 'ML Pipelines and Feature Stores',
    description: 'Feature pipelines, training pipelines, inference pipelines. Feast and Tecton for feature stores. Airflow, Kubeflow, and Prefect for orchestration.',
    topics: ['Pipelines', 'Feature store', 'Airflow', 'Kubeflow'],
  },
  {
    num: '69', section: 11, color: sectionColors[11], status: 'soon', xp: 100,
    readTime: '35 min',
    title: 'Experiment Tracking with MLflow and Weights & Biases',
    description: 'Log every run, compare experiments, version models, register artifacts. Never lose a good experiment again.',
    topics: ['MLflow', 'W&B', 'Experiment tracking', 'Model registry'],
  },
  {
    num: '70', section: 11, color: sectionColors[11], status: 'soon', xp: 100,
    readTime: '55 min',
    title: 'Model Deployment — FastAPI, Docker, Kubernetes',
    description: 'Wrap your model in a FastAPI endpoint, containerise with Docker, scale with Kubernetes. Full working deployment of the Swiggy delivery model.',
    topics: ['FastAPI', 'Docker', 'K8s', 'REST API', 'Serving'],
  },
  {
    num: '71', section: 11, color: sectionColors[11], status: 'soon', xp: 100,
    readTime: '40 min',
    title: 'Model Monitoring — Drift Detection and Retraining',
    description: 'How to know your model is degrading before users complain. Data drift, concept drift, Evidently AI, and automated retraining triggers.',
    topics: ['Drift', 'Monitoring', 'Evidently', 'Retraining'],
  },
  {
    num: '72', section: 11, color: sectionColors[11], status: 'soon', xp: 100,
    readTime: '35 min',
    title: 'Retraining Pipelines — Keeping Models Fresh',
    description: 'Automated retraining schedules, trigger-based retraining on drift alerts, champion-challenger evaluation, and safe model promotion to production.',
    topics: ['Retraining', 'Scheduled', 'Champion-challenger', 'Model promotion'],
  },
  {
    num: '73', section: 11, color: sectionColors[11], status: 'soon', xp: 100,
    readTime: '35 min',
    title: 'DVC — Data Version Control',
    description: 'Version datasets like code. DVC pipelines, remote storage, experiment tracking, and the full DVC + Git workflow for ML projects.',
    topics: ['DVC', 'Data versioning', 'Pipelines', 'Git'],
  },
  {
    num: '74', section: 11, color: sectionColors[11], status: 'soon', xp: 100,
    readTime: '60 min',
    title: 'ML System Design — End to End',
    description: 'Design any ML system from scratch. The framework, trade-offs, capacity estimation, and how to present it in an interview.',
    topics: ['System design', 'Architecture', 'Trade-offs', 'Interview'],
  },

  // ── Section 12 — Cloud ML Platforms ──────────────────────────────────────
  {
    num: '75', section: 12, color: sectionColors[12], status: 'soon', xp: 100,
    readTime: '50 min',
    title: 'Azure ML — Studio, Pipelines and AutoML',
    description: 'Azure Machine Learning Studio, compute clusters, AML Pipelines, AutoML, model registry, and online endpoints. Connects to the existing Azure track.',
    topics: ['Azure ML', 'AML Pipelines', 'AutoML', 'Endpoints'],
  },
  {
    num: '76', section: 12, color: sectionColors[12], status: 'soon', xp: 100,
    readTime: '45 min',
    title: 'AWS SageMaker — Training Jobs and Pipelines',
    description: 'SageMaker training jobs, SageMaker Pipelines, Feature Store, Clarify for bias detection, and JumpStart model hub.',
    topics: ['SageMaker', 'Training jobs', 'Clarify', 'JumpStart'],
  },
  {
    num: '77', section: 12, color: sectionColors[12], status: 'soon', xp: 100,
    readTime: '45 min',
    title: 'GCP Vertex AI — Pipelines and AutoML',
    description: 'Vertex Pipelines (Kubeflow-based), Feature Store, AutoML Tables, model endpoints, and BigQuery ML for SQL-native ML.',
    topics: ['Vertex AI', 'Vertex Pipelines', 'BigQuery ML', 'AutoML'],
  },
  {
    num: '78', section: 12, color: sectionColors[12], status: 'soon', xp: 100,
    readTime: '50 min',
    title: 'MLOps on Cloud — CI/CD for ML',
    description: 'GitHub Actions for ML pipelines, automated training and deployment, model validation gates, and the full MLOps loop on a cloud provider.',
    topics: ['CI/CD', 'GitHub Actions', 'MLOps', 'Automation'],
  },
  {
    num: '79', section: 12, color: sectionColors[12], status: 'soon', xp: 300,
    readTime: '90 min',
    title: 'Interview Prep — 50 Complete ML Answers',
    description: '50 complete answers covering classical ML, deep learning, system design, coding rounds, and behavioural questions — written at senior engineer depth.',
    topics: ['Interview', 'Classical ML', 'DL', 'System design', 'Behavioural'],
  },
]

export default function AIMLTrack() {
  const [activeSection, setActiveSection] = useState<SectionFilter>('all')

  const filtered =
    activeSection === 'all'
      ? modules
      : modules.filter((m) => m.section === parseInt(activeSection))

  return (
    <LearnLayout
      title="AI & Machine Learning"
      description="From zero to production-grade AI/ML — 60+ modules, no prerequisites"
      section="AI & ML"
      readTime="Self-paced"
      updatedAt="March 2026"
    >

      {/* ── Who This Is For ────────────────────────────────────────────── */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: 12,
        marginBottom: 40,
      }}>
        {[
          { icon: '🎓', label: 'Complete beginners — zero ML knowledge required' },
          { icon: '💻', label: 'Developers moving into AI/ML engineering' },
          { icon: '📊', label: 'Data engineers adding ML to their skillset' },
          { icon: '🏆', label: 'Anyone preparing for ML engineer interviews' },
        ].map((item) => (
          <div key={item.label} style={{
            background: 'var(--surface)',
            border: '1px solid var(--border)',
            borderRadius: 10,
            padding: '14px 16px',
            display: 'flex',
            alignItems: 'center',
            gap: 10,
          }}>
            <span style={{ fontSize: 20 }}>{item.icon}</span>
            <span style={{ fontSize: 13, color: 'var(--text)', lineHeight: 1.5 }}>{item.label}</span>
          </div>
        ))}
      </div>

      {/* ── Stats bar ──────────────────────────────────────────────────── */}
      <div style={{
        display: 'flex',
        gap: 28,
        flexWrap: 'wrap',
        background: 'var(--surface)',
        border: '1px solid var(--border)',
        borderRadius: 12,
        padding: '20px 28px',
        marginBottom: 36,
      }}>
        {[
          { value: '60+',   label: 'Modules'         },
          { value: '11',    label: 'Sections'         },
          { value: '100+',  label: 'Topics covered'   },
          { value: '~60h',  label: 'Total content'    },

        ].map((s) => (
          <div key={s.label}>
            <div style={{
              fontSize: 24, fontWeight: 900,
              color: 'var(--green)', fontFamily: 'var(--font-display)',
            }}>
              {s.value}
            </div>
            <div style={{ fontSize: 12, color: 'var(--muted)', marginTop: 2 }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* ── Notice box ─────────────────────────────────────────────────── */}
      <div style={{
        background: 'rgba(0,230,118,0.06)',
        border: '1px solid rgba(0,230,118,0.2)',
        borderRadius: 10,
        padding: '16px 20px',
        marginBottom: 40,
        fontSize: 14,
        color: 'var(--text)',
        lineHeight: 1.7,
      }}>
        <strong style={{ color: 'var(--accent)' }}>This track covers AI and ML from first principles.</strong>{' '}
        Math, classical algorithms, deep learning, and generative AI. Cloud ML platforms (Azure ML,
        SageMaker, Vertex AI) each have their own dedicated tracks. This track makes you understand
        what every tool is actually doing before you touch it.
      </div>

      {/* ── Curriculum heading + section filter ────────────────────────── */}
      <div style={{ marginTop: 48, marginBottom: 8 }}>
        <div style={{
          fontSize: 10, fontWeight: 700, letterSpacing: '.12em',
          textTransform: 'uppercase', color: 'var(--muted)',
          fontFamily: 'var(--font-mono)', marginBottom: 10,
        }}>
          // Curriculum
        </div>

        <div style={{
          display: 'flex', justifyContent: 'space-between',
          alignItems: 'flex-end', flexWrap: 'wrap', gap: 16, marginBottom: 6,
        }}>
          <div>
            <h2 style={{
              fontSize: 'clamp(20px, 2.5vw, 28px)', fontWeight: 900,
              letterSpacing: '-1px', color: 'var(--text)',
              fontFamily: 'var(--font-display)', marginBottom: 6,
            }}>
              60+ Modules. Zero to Advanced.
            </h2>
            <p style={{ fontSize: 14, color: 'var(--muted)', lineHeight: 1.7, maxWidth: 520, margin: 0 }}>
              Follow in order. Each module builds on the last. Every concept is
              introduced exactly when you need it, not before.
            </p>
          </div>

          {/* Section filter tabs */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
            {(['all', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'] as SectionFilter[]).map((f) => {
              const col = f === 'all' ? 'var(--accent)' : sectionColors[parseInt(f)]
              const isActive = activeSection === f
              return (
                <button
                  key={f}
                  onClick={() => setActiveSection(f)}
                  style={{
                    fontSize: 11, fontWeight: 700, fontFamily: 'var(--font-mono)',
                    letterSpacing: '.08em', textTransform: 'uppercase',
                    padding: '6px 12px', borderRadius: 8, cursor: 'pointer',
                    border: isActive ? `1px solid ${col}` : '1px solid var(--border)',
                    background: isActive ? `${col}18` : 'var(--surface)',
                    color: isActive ? col : 'var(--muted)',
                    transition: 'all 0.15s',
                  }}
                >
                  {f === 'all' ? 'All' : `S${f}`}
                </button>
              )
            })}
          </div>
        </div>
      </div>

      {/* ── Module Cards ───────────────────────────────────────────────── */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginTop: 28 }}>
        {filtered.map((mod, idx) => {
          const isLive = mod.status === 'live'
          const href   = isLive ? (mod.href ?? '#') : '#'

          return (
            <div key={mod.num}>

              {/* Section header — 'all' view only */}
              {activeSection === 'all' && (idx === 0 || filtered[idx - 1].section !== mod.section) && (
                <div style={{
                  display: 'flex', alignItems: 'center', gap: 10,
                  padding: idx === 0 ? '16px 0 10px' : '28px 0 10px',
                }}>
                  <div style={{
                    width: 26, height: 26, borderRadius: '50%', flexShrink: 0,
                    background: `${mod.color}18`, border: `1px solid ${mod.color}44`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 11, fontWeight: 900, color: mod.color,
                    fontFamily: 'var(--font-mono)',
                  }}>
                    {mod.section}
                  </div>
                  <span style={{
                    fontSize: 11, fontWeight: 700, color: mod.color,
                    fontFamily: 'var(--font-mono)', letterSpacing: '.1em',
                    textTransform: 'uppercase',
                  }}>
                    Section {mod.section} — {sectionInfo[mod.section - 1].title}
                  </span>
                </div>
              )}

              {/* Card */}
              <div style={{
                background: 'var(--surface)',
                border: '1px solid var(--border)',
                borderRadius: 12,
                overflow: 'hidden',
                opacity: isLive ? 1 : 0.88,
                transition: 'border-color 0.2s',
              }}>
                {/* Colored top accent bar */}
                <div style={{ height: 3, background: mod.color, opacity: 0.75 }} />

                <div style={{ padding: '20px 24px' }}>
                  <div style={{
                    display: 'flex', alignItems: 'flex-start',
                    justifyContent: 'space-between', gap: 16, flexWrap: 'wrap',
                  }}>

                    {/* Left */}
                    <div style={{ flex: 1, minWidth: 240 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
                        <span style={{
                          fontFamily: 'var(--font-mono)', fontSize: 11, fontWeight: 700,
                          color: mod.color,
                          background: `${mod.color}18`,
                          border: `1px solid ${mod.color}33`,
                          borderRadius: 6, padding: '3px 8px',
                        }}>
                          MODULE {mod.num}
                        </span>
                        {isLive ? (
                          <span style={{
                            fontSize: 10, fontWeight: 700, color: 'var(--green)',
                            background: 'rgba(0,230,118,0.12)',
                            border: '1px solid rgba(0,230,118,0.3)',
                            borderRadius: 20, padding: '2px 10px', letterSpacing: '.08em',
                          }}>
                            ✓ LIVE
                          </span>
                        ) : (
                          <span style={{
                            fontSize: 10, fontWeight: 600, color: 'var(--muted)',
                            background: 'var(--bg2)', border: '1px solid var(--border)',
                            borderRadius: 20, padding: '2px 10px', letterSpacing: '.08em',
                          }}>
                            COMING SOON
                          </span>
                        )}
                      </div>

                      <h3 style={{
                        fontSize: 17, fontWeight: 800, color: 'var(--text)',
                        fontFamily: 'var(--font-display)', marginBottom: 6,
                        letterSpacing: '-0.4px', lineHeight: 1.3,
                      }}>
                        {mod.title}
                      </h3>

                      <p style={{
                        fontSize: 13, color: 'var(--muted)', lineHeight: 1.65,
                        marginBottom: 14, maxWidth: 560,
                      }}>
                        {mod.description}
                      </p>

                      {/* Topic pills */}
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                        {mod.topics.map((topic) => (
                          <span key={topic} style={{
                            fontSize: 11, color: 'var(--muted)',
                            background: 'var(--bg2)', border: '1px solid var(--border)',
                            borderRadius: 20, padding: '3px 10px',
                            fontFamily: 'var(--font-mono)',
                          }}>
                            {topic}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Right — read time + CTA */}
                    <div style={{
                      display: 'flex', flexDirection: 'column',
                      alignItems: 'flex-end', gap: 12, paddingTop: 4,
                    }}>
                      <div style={{ textAlign: 'right' }}>
                        <div style={{
                          fontSize: 18, fontWeight: 800, color: 'var(--text)',
                          fontFamily: 'var(--font-display)',
                        }}>
                          {mod.readTime}
                        </div>
                        <div style={{ fontSize: 11, color: 'var(--muted)' }}>read time</div>
                      </div>

                      {isLive ? (
                        <Link href={href} style={{
                          display: 'inline-block',
                          background: mod.color,
                          color: '#000',
                          fontSize: 12, fontWeight: 700,
                          borderRadius: 8, padding: '8px 18px',
                          textDecoration: 'none',
                          letterSpacing: '.04em', whiteSpace: 'nowrap',
                        }}>
                          Start →
                        </Link>
                      ) : (
                        <span style={{
                          display: 'inline-block',
                          background: 'var(--bg2)', color: 'var(--muted)',
                          fontSize: 12, fontWeight: 600,
                          borderRadius: 8, padding: '8px 18px',
                          letterSpacing: '.04em', cursor: 'not-allowed',
                          border: '1px solid var(--border)', whiteSpace: 'nowrap',
                        }}>
                          Soon
                        </span>
                      )}
                    </div>

                  </div>
                </div>
              </div>

            </div>
          )
        })}
      </div>

      {/* ── Bottom CTA ─────────────────────────────────────────────────── */}
      <div style={{
        marginTop: 56,
        background: 'linear-gradient(135deg, rgba(0,230,118,0.06) 0%, rgba(66,133,244,0.06) 100%)',
        border: '1px solid var(--border)',
        borderRadius: 14,
        padding: '36px 32px',
        textAlign: 'center',
      }}>
        <div style={{
          fontSize: 10, fontWeight: 700, letterSpacing: '.12em',
          textTransform: 'uppercase', color: 'var(--green)',
          fontFamily: 'var(--font-mono)', marginBottom: 14,
        }}>
          // Ready to start?
        </div>
        <h3 style={{
          fontSize: 'clamp(18px, 2.5vw, 26px)', fontWeight: 900,
          color: 'var(--text)', fontFamily: 'var(--font-display)',
          letterSpacing: '-1px', marginBottom: 12,
        }}>
          Modules are dropping weekly.
        </h3>
        <p style={{
          fontSize: 14, color: 'var(--muted)', lineHeight: 1.7,
          maxWidth: 480, margin: '0 auto 24px',
        }}>
          Start with Module 01 the moment it goes live. Each module is self-contained
          enough to read on its own — but follow the order. Every concept earns the next one.
        </p>
        <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link href="/learn/ai-ml/what-is-ai" style={{
            display: 'inline-block', background: 'var(--green)',
            color: '#000', fontWeight: 700, fontSize: 13,
            borderRadius: 8, padding: '10px 24px', textDecoration: 'none',
          }}>
            Start Module 01 →
          </Link>
          <Link href="/learn/projects" style={{
            display: 'inline-block', background: 'var(--surface)',
            color: 'var(--text)', fontWeight: 600, fontSize: 13,
            borderRadius: 8, padding: '10px 24px', textDecoration: 'none',
            border: '1px solid var(--border)',
          }}>
            Browse projects
          </Link>
        </div>
      </div>

    </LearnLayout>
  )
}
