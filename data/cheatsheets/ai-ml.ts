import type { TrackCheatSheet } from '@/lib/cheatsheet'

export const aiMlCheatSheet: TrackCheatSheet = {
  track: 'ai-ml',
  title: 'AI & Machine Learning',
  trackHref: '/learn/ai-ml',
  accent: '#8b5cf6',
  blurb: 'The AI and machine learning track on one page — landscape, classical models, evaluation, a little deep learning, language and generative ideas, and MLOps. Sketches are pure Python; a library call is marked as a sketch and is not required.',
  sections: [
    {
      title: 'Landscape',
      entries: [
        { label: 'Four words', code: `AI      a system that does work we call intelligent\nML      patterns learned from examples, not only hand-written rules\nDL      ML with multi-layer neural networks\nGenAI   models that generate text, images, audio, or more` },
        { label: 'How the track is grouped', code: `math you reuse\ndata, features, and splits\nclassical models and how to score them\na little deep learning\nlanguage, vision, and generative models\nMLOps and the cloud platforms named later` },
        { label: 'Roles, roughly', code: `modelling     choose the model and the metric\ndata          examples worth learning from\nproduction    train, deploy, watch, retrain\nCloud names in the track: Azure ML, SageMaker, Vertex AI.` },
      ],
    },
    {
      title: 'Math you reuse',
      entries: [
        { label: 'Dot and cosine', code: `def dot(a, b):\n    return sum(x * y for x, y in zip(a, b))\n\ndef cosine(a, b):\n    na = sum(x * x for x in a) ** 0.5\n    nb = sum(y * y for y in b) ** 0.5\n    if na == 0 or nb == 0:\n        return 0.0\n    return dot(a, b) / (na * nb)` },
        { label: 'Slope and chain rule', code: `def numeric_slope(f, x):\n    h = 0.00001\n    return (f(x + h) - f(x - h)) / (2 * h)\n\n# gradient: the slope in every weight at once\n# chain rule: multiply local slopes across layers` },
        { label: 'Bayes and entropy', code: `import math\n\n# P(A|B) = P(B|A) * P(A) / P(B)\n\ndef entropy(probs):\n    return -sum(p * math.log2(p) for p in probs if p > 0)` },
        { label: 'Shapes', code: `vector     a list of numbers\nmatrix     a table; multiplying transforms a vector\ntensor     the same idea in more axes\neigenvector  a direction a transform only stretches` },
      ],
    },
    {
      title: 'Data before the model',
      entries: [
        { label: 'Three splits', code: `def train_val_test(rows, train=0.6, val=0.2):\n    n = len(rows)\n    i = int(n * train)\n    j = int(n * (train + val))\n    return rows[:i], rows[i:j], rows[j:]\n# shuffle first when the file is sorted` },
        { label: 'Scale', code: `def mean(xs):\n    return sum(xs) / len(xs)\n\ndef standardise(xs):\n    mu = mean(xs)\n    var = sum((x - mu) ** 2 for x in xs) / len(xs)\n    sd = var ** 0.5 or 1.0\n    return [(x - mu) / sd for x in xs]\n\ndef minmax(xs):\n    lo, hi = min(xs), max(xs)\n    span = (hi - lo) or 1.0\n    return [(x - lo) / span for x in xs]` },
        { label: 'Categories and gaps', code: `def one_hot(value, levels):\n    return [1 if value == level else 0 for level in levels]\n\n# missing: drop or fill, and write down which\n# outlier: far from the rest — error, or the point` },
      ],
    },
    {
      title: 'Classical machine learning',
      entries: [
        { label: 'Linear regression', code: `def predict_linear(x, w, b):\n    return sum(wi * xi for wi, xi in zip(w, x)) + b\n# learn w and b so predictions sit near y` },
        { label: 'Logistic regression', code: `def sigmoid(z):\n    if z >= 0:\n        return 1 / (1 + 2.718281828 ** (-z))\n    ez = 2.718281828 ** z\n    return ez / (1 + ez)\n# probability = sigmoid(w·x + b)\n# a threshold (often 0.5) makes it a class` },
        { label: 'Neighbours', code: `def knn(query, rows, k=3):\n    # each row is (features, label)\n    def dist(feats):\n        return sum((a - b) ** 2 for a, b in zip(query, feats))\n    return sorted(rows, key=lambda row: dist(row[0]))[:k]` },
        { label: 'Other classical names', code: `decision tree   a chain of if / else on features\nnaive Bayes     features treated as independent given the class\nSVM             a boundary with the widest margin\n# sketch — library not required to read this page\n# LogisticRegression().fit(X, y)` },
      ],
    },
    {
      title: 'Ensembles and structure',
      entries: [
        { label: 'Many models', code: `random forest      many trees, bootstrap rows, random features\ngradient boosting  each new tree fits the remaining error\nXGBoost, LightGBM  fast boosting — names in the track\n# sketch only; nothing here imports them` },
        { label: 'Unsupervised', code: `k-means\n  pick k centres\n  assign each point to the nearest\n  move each centre to its members\n  repeat\nPCA\n  new axes that keep the most variance\n  fewer columns, most of the spread` },
      ],
    },
    {
      title: 'Evaluation',
      entries: [
        { label: 'Counts that matter', code: `def confusion(pairs):\n    # pairs of (truth, pred) in {0, 1}\n    tp = sum(t == 1 and p == 1 for t, p in pairs)\n    fp = sum(t == 0 and p == 1 for t, p in pairs)\n    fn = sum(t == 1 and p == 0 for t, p in pairs)\n    tn = sum(t == 0 and p == 0 for t, p in pairs)\n    return tp, fp, fn, tn\n\ndef precision_recall(tp, fp, fn):\n    prec = tp / (tp + fp) if tp + fp else 0\n    rec = tp / (tp + fn) if tp + fn else 0\n    return prec, rec` },
        { label: 'Beyond accuracy', code: `Accuracy hides a rare class.\nF1 is the harmonic mean of precision and recall.\nROC: true-positive rate vs false-positive rate\n    as the threshold moves.\nAUC: area under that curve. 0.5 is chance.\nCalibration: if you say 0.8, about 80% should be positive.` },
        { label: 'Regression scores', code: `def mae(y, yhat):\n    return sum(abs(a - b) for a, b in zip(y, yhat)) / len(y)\n\ndef rmse(y, yhat):\n    err = sum((a - b) ** 2 for a, b in zip(y, yhat)) / len(y)\n    return err ** 0.5\n\ndef r_squared(y, yhat):\n    mu = sum(y) / len(y)\n    tot = sum((a - mu) ** 2 for a in y)\n    res = sum((a - b) ** 2 for a, b in zip(y, yhat))\n    return 1 - res / tot if tot else 0` },
        { label: 'Trust the number', code: `Cross-validation rotates which fold is held out.\nBias: the model is too rigid for the pattern.\nVariance: it memorises this sample.\nHyperparameter search (Optuna is named in the track)\n  tunes knobs, not the test set.\nSHAP and LIME: which features pushed one prediction.` },
      ],
    },
    {
      title: 'A little deep learning',
      entries: [
        { label: 'One unit', code: `def relu(z):\n    return z if z > 0 else 0\n\ndef unit(z, w, b):\n    total = sum(wi * zi for wi, zi in zip(w, z)) + b\n    return relu(total)\n# a network stacks these\n# backprop is the chain rule on every weight` },
        { label: 'Loss and steps', code: `squared error     for a number\ncross-entropy     for a class\nSGD               step against the gradient, in batches\nAdam / AdamW      per-weight step sizes\n                  AdamW also decays weights` },
        { label: 'Architectures, named', code: `batch norm    keep a layer's inputs on a stable scale\ndropout       ignore random units while training\nCNN           local filters, used for images\nRNN / LSTM    a state carried along a sequence\nattention     weigh other positions, not only the last one` },
      ],
    },
    {
      title: 'Language and generative ideas',
      entries: [
        { label: 'Tokens and vectors', code: `token       a piece of text: word, subword, or bytes\nembedding   a vector for that token\nsimilar tokens land nearer in that space\n# reuse cosine from the math section to compare them` },
        { label: 'Readers and writers', code: `BERT-style encoder   reads the whole span both ways\ndecoder LLM          predicts the next token\nLoRA / adapters      small added weights for a fine-tune\nprompt               the instruction plus the evidence you pass` },
        { label: 'Retrieve, then speak', code: `RAG\n  retrieve passages\n  generate an answer grounded in them\nAn agent may call a tool, read the result, and continue.\nAdvanced RAG is a later title, not a second idea.` },
        { label: 'Generative families', code: `GAN          generator vs discriminator\nVAE          encode to a distribution, sample, decode\ndiffusion    learn to denoise, one step at a time\nLLM words    pretraining, RLHF, scaling\nmultimodal   CLIP, LLaVA — image and text together` },
      ],
    },
    {
      title: 'MLOps',
      entries: [
        { label: 'From rows to a run', code: `pipeline       data, features, train, evaluate, register\nfeature store  the same definition in train and in serve\ntracking       MLflow or Weights & Biases:\n               a metric tied to a commit and a dataset\nDVC            version the data, not only the code` },
        { label: 'Drift', code: `def drifted(today, baseline, tol=0.2):\n    mu = lambda xs: sum(xs) / len(xs)\n    return abs(mu(today) - mu(baseline)) > tol\n# inputs or labels moved away from training\n# a retrain trigger is a rule you wrote down` },
        { label: 'Ship it', code: `# sketch — no server is started by this page\n# an HTTP handler loads a saved model\n# and returns one prediction per request\n# cloud CI in the track: Azure ML, SageMaker, Vertex AI\nWatch latency, errors, and the drift rule after launch.` },
      ],
    },
  ],
  projects: [
    { title: 'Cosine on three sentences', level: 'Beginner', build: 'Turn three short sentences into word-count vectors with the standard library. Rank them against a query using your own dot product and cosine. No NumPy.', skills: ['vectors', 'dot product', 'similarity'] },
    { title: 'Score a guess', level: 'Beginner', build: 'Type two short lists, y and yhat. Print MAE, RMSE, and R² from the formulas on this page, and say which error worries you more.', skills: ['MAE', 'RMSE', 'R²'] },
    { title: 'k-NN on a dozen rows', level: 'Intermediate', build: 'Hand-label about twelve rows with two numeric features. Hold out three. Predict them with the pure-Python k-NN sketch and describe one mistake.', skills: ['distance', 'holdout', 'k-NN'] },
    { title: 'Imbalanced evaluation card', level: 'Intermediate', build: 'Invent a yes/no problem where "no" is common. From made-up truth and predictions, compute precision and recall and write why accuracy would green-light a bad model. Mention calibration in one sentence.', skills: ['confusion counts', 'precision', 'recall'] },
    { title: 'One-page system design', level: 'Advanced', build: 'Write the decision, the features, the split, the metric, where drift would show up, and what triggers a retrain. Optional: ten pure-Python steps of gradient descent for y ≈ w·x on a handful of points. Do not import a training framework.', skills: ['ML system design', 'drift', 'baselines'] },
  ],
}
