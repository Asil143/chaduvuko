import type { LessonQuick } from '@/lib/lesson-quick'

const A = '/learn/ai-ml'

// Concept examples are pure-Python (standard library only) so they run anywhere and show real
// output. Framework code (NumPy, scikit-learn, PyTorch, FastAPI, cloud SDKs) is shown as code.
export const AIML_QUICK: Record<string, LessonQuick> = {
  [`${A}/what-is-ai`]: {
    answer: 'AI is any technique that makes machines act intelligently. Machine learning (ML) is the subset where the machine learns rules from data instead of being programmed with them; deep learning is ML with many-layered neural networks; and generative AI creates new content such as text or images.',
    points: [
      'AI ⊃ ML ⊃ deep learning; generative AI is deep learning that creates content.',
      'ML learns patterns from examples rather than hand-written rules.',
      'More data and compute, plus neural networks, drove the recent leap.',
    ],
    example: {
      label: 'Rules written by hand vs a rule learned from data',
      lang: 'python',
      code: `# hand-coded rule (plain AI)
def is_spam_rules(subject):
    return "free money" in subject.lower()

# a rule learned from labelled examples (ML, in miniature)
examples = [("free money now", 1), ("meeting at 3", 0), ("win free cash", 1), ("lunch?", 0)]
spam_words = {w for text, label in examples if label == 1 for w in text.split()}
ham_words = {w for text, label in examples if label == 0 for w in text.split()}
learned = spam_words - ham_words
print("learned spam words:", sorted(learned))
print("is_spam('free lunch'):", bool(set("free lunch".split()) & learned))`,
    },
    check: {
      question: 'How does machine learning differ from hand-coded AI?',
      options: ['It is faster', 'It learns the rules from data instead of being given them', 'It needs no data', 'It only works on images'],
      answer: 1,
      explanation: 'In ML you provide examples and the algorithm finds the patterns, rather than a human writing the rules.',
    },
  },

  [`${A}/ai-ml-landscape`]: {
    answer: 'The ML toolkit is organised by workflow stage: data (NumPy, pandas), classical ML (scikit-learn, XGBoost), deep learning (PyTorch), NLP and LLMs (Hugging Face), and deployment and operations (FastAPI, Docker, MLOps tools). Learning them in that order builds each skill on the last.',
    points: [
      'A proven path: NumPy → pandas → scikit-learn → XGBoost → PyTorch → Hugging Face → FastAPI and Docker.',
      'Roles range from ML engineer to data scientist to MLOps engineer.',
      'Master the stage you are in before moving on.',
    ],
    example: {
      label: 'The stages a project moves through',
      lang: 'text',
      code: `Data        NumPy, pandas          — load, clean, explore
Classical   scikit-learn, XGBoost  — tabular models
Deep        PyTorch                — neural networks
NLP / LLM   Hugging Face           — text and language models
Deploy/ops  FastAPI, Docker, MLOps — serve and monitor`,
      static: true,
    },
    check: {
      question: 'Which library is the usual first step for numerical ML in Python?',
      options: ['PyTorch', 'NumPy', 'FastAPI', 'Docker'],
      answer: 1,
      explanation: 'NumPy arrays underpin pandas, scikit-learn and the rest; it is the foundation to learn first.',
    },
  },

  // ── Math foundations ─────────────────────────────────────────────────────
  [`${A}/math-foundations/vectors-matrices-tensors`]: {
    answer: 'ML data is stored as nested arrays: a scalar is one number, a vector a list of numbers, a matrix a 2D grid, and a tensor any N-dimensional array. One data point is a vector, a dataset is a matrix, and a batch of images is a 4D tensor (batch, height, width, channels).',
    points: [
      'Each shape extends the previous by one dimension.',
      'One row of a dataset is a vector of features.',
      'A tensor\'s shape tells you what each dimension means.',
    ],
    example: {
      label: 'Shapes from scalar to 3D tensor',
      lang: 'python',
      code: `scalar = 5
vector = [1.0, 2.0, 3.0]
matrix = [[1, 2, 3], [4, 5, 6]]                 # 2 rows (samples) × 3 columns (features)
tensor = [[[1, 2], [3, 4]], [[5, 6], [7, 8]]]   # 2 × 2 × 2
print("vector length:", len(vector))
print("matrix shape:", len(matrix), "x", len(matrix[0]))
print("tensor shape:", len(tensor), "x", len(tensor[0]), "x", len(tensor[0][0]))`,
    },
    check: {
      question: 'How is a batch of colour images represented?',
      options: ['A vector', 'A matrix', 'A 4D tensor (batch, height, width, channels)', 'A scalar'],
      answer: 2,
      explanation: 'Each image is height × width × channels, and stacking a batch adds a fourth dimension.',
    },
  },

  [`${A}/math-foundations/matrix-multiplication`]: {
    answer: 'Matrix multiplication combines two matrices by taking dot products of rows and columns: each output element is a row of the left matrix dotted with a column of the right. The shape rule is (m × n) @ (n × p) → (m × p); the inner dimensions must match.',
    points: [
      'It is not element-wise; it is rows against columns.',
      'The inner dimensions must match, or it is undefined.',
      'Every neural network layer is a matrix multiply plus a bias.',
    ],
    example: {
      label: 'A 2×3 times a 3×2 by hand',
      lang: 'python',
      code: `A = [[1, 2, 3], [4, 5, 6]]          # 2 x 3
B = [[7, 8], [9, 10], [11, 12]]    # 3 x 2

result = [[sum(A[i][k] * B[k][j] for k in range(3)) for j in range(2)] for i in range(2)]
for row in result:                 # 2 x 2
    print(row)`,
    },
    check: {
      question: 'Can you multiply a (4 × 3) matrix by a (4 × 2) matrix?',
      options: ['Yes, result is 4 × 2', 'No, the inner dimensions (3 and 4) do not match', 'Yes, result is 3 × 2', 'Only if they are square'],
      answer: 1,
      explanation: 'The left matrix\'s columns (3) must equal the right matrix\'s rows (4); here they differ.',
    },
  },

  [`${A}/math-foundations/dot-product-similarity`]: {
    answer: 'The dot product multiplies matching positions of two vectors and sums them, giving one number that is high when the vectors agree. Cosine similarity divides the dot product by the vectors\' lengths, measuring only direction, which is why it powers recommendations and embedding search.',
    points: [
      'The raw dot product grows with magnitude.',
      'Cosine similarity compares direction, ignoring length.',
      'Attention and recommendations are built on these.',
    ],
    example: {
      label: 'Dot product and cosine similarity by hand',
      lang: 'python',
      code: `import math

def dot(a, b):
    return sum(x * y for x, y in zip(a, b))

def cosine(a, b):
    return dot(a, b) / (math.sqrt(dot(a, a)) * math.sqrt(dot(b, b)))

u, v = [1, 2, 3], [2, 4, 6]        # same direction, double length
w = [3, -2, 0]                     # different direction
print("dot(u, v):", dot(u, v))
print("cosine(u, v):", round(cosine(u, v), 3))   # 1.0, identical direction
print("cosine(u, w):", round(cosine(u, w), 3))`,
    },
    check: {
      question: 'Why use cosine similarity instead of the raw dot product for comparing taste?',
      options: ['It is faster', 'It measures direction only, so overall magnitude does not dominate', 'It returns integers', 'It needs no vectors'],
      answer: 1,
      explanation: 'Dividing by the lengths means two vectors pointing the same way score 1 regardless of scale.',
    },
  },

  [`${A}/math-foundations/eigenvalues-eigenvectors`]: {
    answer: 'An eigenvector of a matrix is a direction that the matrix only stretches or shrinks, never rotates; the factor it is scaled by is the eigenvalue. They are the natural axes of a transformation and underpin PCA, spectral clustering and PageRank.',
    points: [
      'A v = λ v: the matrix acts on v like simple scaling by λ.',
      'Most vectors change direction; eigenvectors do not.',
      'The largest eigenvalues capture the most important directions.',
    ],
    example: {
      label: 'Check that a vector is an eigenvector',
      lang: 'python',
      code: `def matvec(M, v):
    return [sum(M[i][j] * v[j] for j in range(len(v))) for i in range(len(M))]

A = [[2, 0], [0, 3]]
for v in ([1, 0], [0, 1], [1, 1]):
    Av = matvec(A, v)
    # is Av a scalar multiple of v?
    ratios = [Av[i] / v[i] for i in range(2) if v[i] != 0]
    eigen = len(set(ratios)) == 1
    print(f"v={v}  A v={Av}  eigenvector={eigen}" + (f", eigenvalue={ratios[0]}" if eigen else ""))`,
    },
    check: {
      question: 'What makes a vector an eigenvector of a matrix?',
      options: ['The matrix rotates it 90 degrees', 'The matrix only scales it, keeping its direction', 'It has length 1', 'It is all zeros'],
      answer: 1,
      explanation: 'A v = λ v means the transformation leaves the direction unchanged and only multiplies the length.',
    },
  },

  [`${A}/math-foundations/derivatives-and-gradients`]: {
    answer: 'A derivative measures how much the output changes when you nudge an input. In ML the input is a weight and the output is the loss, so the gradient (the vector of partial derivatives) points uphill; training moves the opposite way to reduce loss. The chain rule combines derivatives through layers.',
    points: [
      'Move opposite the gradient to decrease the loss (gradient descent).',
      'The gradient collects one partial derivative per weight.',
      'The chain rule is how backpropagation flows gradients through layers.',
    ],
    example: {
      label: 'Gradient descent on f(x) = x² (minimum at 0)',
      lang: 'python',
      code: `x = 5.0
lr = 0.3
for step in range(6):
    gradient = 2 * x          # derivative of x^2
    x = x - lr * gradient     # move opposite the gradient
    print(f"step {step}: x = {x:.4f}, loss = {x * x:.4f}")`,
    },
    check: {
      question: 'To reduce the loss, which way do you move the weights?',
      options: ['Along the gradient', 'Opposite the gradient', 'Perpendicular to the gradient', 'Randomly'],
      answer: 1,
      explanation: 'The gradient points toward higher loss, so stepping the other way lowers it.',
    },
  },

  [`${A}/math-foundations/probability-distributions`]: {
    answer: 'A probability distribution lists the possible values of a random variable and how likely each is. ML relies on a few: Normal (regression errors), Bernoulli (binary outcomes), Binomial, Poisson and others. Bayes\' theorem updates a prior belief with evidence to get a posterior.',
    points: [
      'Discrete distributions have countable outcomes; continuous ones have densities.',
      'Bayes: posterior ∝ likelihood × prior.',
      'Most loss functions are secretly a probability model.',
    ],
    example: {
      label: 'Bayes\' theorem: probability of a disease given a positive test',
      lang: 'python',
      code: `prior = 0.01            # 1% of people have it
sensitivity = 0.9       # P(positive | disease)
false_positive = 0.05   # P(positive | healthy)

p_pos = sensitivity * prior + false_positive * (1 - prior)
posterior = sensitivity * prior / p_pos
print(f"P(disease | positive) = {posterior:.1%}")   # far below 90%`,
    },
    check: {
      question: 'Bayes\' theorem combines the likelihood with what to give the posterior?',
      options: ['The accuracy', 'The prior', 'The variance', 'The mean'],
      answer: 1,
      explanation: 'Posterior ∝ likelihood × prior; the prior is the belief before seeing the evidence.',
    },
  },

  [`${A}/math-foundations/information-theory`]: {
    answer: 'Information theory measures surprise. Self-information of an event is −log₂ P(x) bits: rare events carry more. Entropy is the average self-information of a distribution, its uncertainty. Cross-entropy and KL divergence, which compare two distributions, are the basis of most neural-network losses.',
    points: [
      'Certain events carry 0 bits; a coin flip carries 1 bit.',
      'Entropy is highest when outcomes are equally likely.',
      'Cross-entropy loss measures how far predictions are from the truth.',
    ],
    example: {
      label: 'Entropy of a fair vs a biased coin',
      lang: 'python',
      code: `import math

def entropy(probs):
    return -sum(p * math.log2(p) for p in probs if p > 0)

print("fair coin   :", entropy([0.5, 0.5]), "bits")
print("biased coin :", round(entropy([0.9, 0.1]), 3), "bits")
print("certain     :", entropy([1.0, 0.0]), "bits")`,
    },
    check: {
      question: 'When is a distribution\'s entropy highest?',
      options: ['When one outcome is certain', 'When all outcomes are equally likely', 'When there are two outcomes', 'When probabilities are negative'],
      answer: 1,
      explanation: 'Maximum uncertainty, and so maximum entropy, occurs when every outcome is equally probable.',
    },
  },

  // ── Programming ──────────────────────────────────────────────────────────
  [`${A}/programming/python-for-ml`]: {
    answer: 'ML Python favours vectorised, readable patterns: comprehensions over loops, generators for streaming data, and classes for custom estimators. A classic bug to avoid is a mutable default argument, which is created once and shared across every call.',
    points: [
      'Prefer vectorised NumPy and pandas operations to Python loops.',
      'Use None as a default and build the mutable object inside.',
      'Generators load large datasets without holding them all in memory.',
    ],
    example: {
      label: 'The mutable-default-argument bug and its fix',
      lang: 'python',
      code: `def buggy(x, acc=[]):        # one list shared across calls
    acc.append(x)
    return acc

def fixed(x, acc=None):
    acc = [] if acc is None else acc
    acc.append(x)
    return acc

print("buggy:", buggy(1), buggy(2))   # [1] then [1, 2]
print("fixed:", fixed(1), fixed(2))   # [1] then [2]`,
    },
    check: {
      question: 'Why avoid def f(x, items=[]) with a mutable default?',
      options: ['It is slow', 'The same list is reused across calls, accumulating values', 'Python forbids it', 'Lists cannot be arguments'],
      answer: 1,
      explanation: 'The default is created once at definition, so every call shares and mutates the same list.',
    },
  },

  [`${A}/programming/numpy-arrays`]: {
    answer: 'A NumPy array stores one data type in contiguous memory and runs operations in optimised C, typically far faster than Python loops. Broadcasting lets arrays of different shapes combine without copying, and the dtype controls precision and memory.',
    points: [
      'Vectorised array operations replace explicit loops.',
      'Broadcasting stretches a smaller shape to match a larger one.',
      'float32 uses half the memory of float64 and is GPU-friendly.',
    ],
    example: {
      label: 'Vectorised scaling and broadcasting',
      lang: 'python',
      code: `import numpy as np

prices = np.array([3.50, 5.00, 2.25])
print("with tax:", prices * 1.08)                 # scalar broadcast over the array

matrix = np.array([[1, 2, 3], [4, 5, 6]])
col_means = matrix.mean(axis=0)
print("centred:\\n", matrix - col_means)           # (2,3) - (3,) broadcasts per column`,
      static: true,
    },
    check: {
      question: 'What is broadcasting in NumPy?',
      options: ['Sending arrays over a network', 'Combining arrays of different shapes by stretching the smaller one', 'Printing an array', 'Sorting an array'],
      answer: 1,
      explanation: 'Broadcasting applies an operation across mismatched shapes without copying data.',
    },
  },

  [`${A}/programming/pandas-dataframes`]: {
    answer: 'pandas represents tabular data as a DataFrame (a table of columns) built from Series (single columns). Before touching a new dataset, run info(), head(), describe(), isnull().sum() and value_counts() to understand its shape, types, missing values and distributions.',
    points: [
      'A DataFrame is a collection of Series sharing one index.',
      'Filter rows with boolean masks: df[df.amount > 100].',
      'groupby().agg() is pandas\' version of SQL GROUP BY.',
    ],
    example: {
      label: 'Load, inspect and aggregate (pandas)',
      lang: 'python',
      code: `import pandas as pd

df = pd.DataFrame({"city": ["Austin", "Denver", "Austin"], "total": [40, 25, 15]})
print(df.describe())
print(df.groupby("city")["total"].sum())`,
      static: true,
    },
    check: {
      question: 'What is a pandas DataFrame made of?',
      options: ['A single number', 'Columns, each a Series, sharing one index', 'A NumPy function', 'A plot'],
      answer: 1,
      explanation: 'Each column is a Series; together they form the labelled 2D table.',
    },
  },

  [`${A}/programming/matplotlib-seaborn`]: {
    answer: 'Matplotlib and seaborn make the plots ML work relies on. Use the object-oriented API (fig, ax = plt.subplots()) for control and multi-panel figures. Exploratory analysis usually starts with histograms, KDEs, boxplots, scatter plots and a correlation heatmap.',
    points: [
      'Prefer fig, ax = plt.subplots() over the stateful pyplot API.',
      'Histograms show a feature\'s shape; scatter plots show relationships.',
      'Learning curves and confusion matrices diagnose models.',
    ],
    example: {
      label: 'A histogram with the object-oriented API',
      lang: 'python',
      code: `import matplotlib.pyplot as plt

data = [12, 45, 8, 120, 33, 5, 61, 19, 240, 27]
fig, ax = plt.subplots()
ax.hist(data, bins=5)
ax.set_title("Watch time")
ax.set_xlabel("minutes")
fig.savefig("watch_time.png")`,
      static: true,
    },
    check: {
      question: 'Which plot best shows the shape of a single feature\'s distribution?',
      options: ['Scatter plot', 'Histogram', 'Line plot', 'Pie chart'],
      answer: 1,
      explanation: 'A histogram buckets the values to reveal their distribution; scatter plots compare two features.',
    },
  },

  [`${A}/programming/sklearn-interface`]: {
    answer: 'Every scikit-learn algorithm shares one interface: .fit() learns from data, .transform() applies a learned transformation, and .predict() makes predictions. You fit only on training data; fitting on test data leaks information and inflates the scores.',
    points: [
      'fit → transform for preprocessors; fit → predict for models.',
      'Never call fit on the test set.',
      'Pipelines chain preprocessing and a model into one object.',
    ],
    example: {
      label: 'The fit / predict interface (scikit-learn)',
      lang: 'python',
      code: `from sklearn.linear_model import LinearRegression
from sklearn.pipeline import make_pipeline
from sklearn.preprocessing import StandardScaler

model = make_pipeline(StandardScaler(), LinearRegression())
model.fit(X_train, y_train)          # learn on training data only
predictions = model.predict(X_test)  # apply to unseen data`,
      static: true,
    },
    check: {
      question: 'Why must you never call .fit() on the test set?',
      options: ['It is slow', 'It leaks information and makes the evaluation look better than it is', 'Test sets cannot be fitted', 'It deletes the data'],
      answer: 1,
      explanation: 'Fitting learns from the data; doing it on the test set means you are no longer measuring unseen performance.',
    },
  },

  // ── Data engineering for ML ──────────────────────────────────────────────
  [`${A}/data-engineering/data-collection`]: {
    answer: 'ML data comes from APIs, databases, files and scraping. Production collection needs timeouts on every request, retry with exponential backoff, pagination to get all records, and respect for rate limits (the Retry-After header), so a pipeline does not hang or get blocked.',
    points: [
      'Always set a request timeout.',
      'Retry transient failures with exponential backoff.',
      'Follow pagination until there are no more pages.',
    ],
    example: {
      label: 'Exponential backoff delays between retries',
      lang: 'python',
      code: `base, cap = 1.0, 30.0
for attempt in range(6):
    delay = min(base * 2 ** attempt, cap)
    print(f"attempt {attempt + 1}: wait up to {delay:.0f}s before retrying")`,
    },
    check: {
      question: 'Why set a timeout on every HTTP request in a data pipeline?',
      options: ['To make it faster', 'A missing timeout can block the pipeline indefinitely', 'It is required by HTTP', 'To encrypt the data'],
      answer: 1,
      explanation: 'Without a timeout a single unresponsive server can stall the whole pipeline.',
    },
  },

  [`${A}/data-engineering/data-cleaning`]: {
    answer: 'Cleaning turns messy data into reliable training sets. Audit first (count nulls, check ranges, find duplicates), then fix systematically: coerce types, handle missing values, treat outliers, and validate every batch against a schema defined in code.',
    points: [
      'Audit before fixing; you cannot clean what you have not measured.',
      'A schema is a contract: types, nullability, ranges, allowed values.',
      'Validate every new batch, not just the first.',
    ],
    example: {
      label: 'Audit a column before deciding how to clean it',
      lang: 'python',
      code: `ages = [34, 28, None, 45, 999, 31, -2, 29]
present = [a for a in ages if a is not None]
valid = [a for a in present if 0 <= a <= 120]
print("rows:", len(ages))
print("missing:", ages.count(None))
print("out of range:", len(present) - len(valid))
print("clean values:", valid)`,
    },
    check: {
      question: 'What should you do before cleaning a dataset?',
      options: ['Delete all nulls', 'Audit it: count nulls, check ranges, find duplicates', 'Train a model', 'Scale the features'],
      answer: 1,
      explanation: 'An audit shows what is actually wrong so you fix problems deliberately rather than by guesswork.',
    },
  },

  [`${A}/data-engineering/feature-scaling`]: {
    answer: 'Feature scaling puts features on comparable ranges so no single one dominates. StandardScaler subtracts the mean and divides by the standard deviation (mean 0, std 1); MinMaxScaler squeezes values into a fixed range. Distance- and gradient-based models (SVM, KNN, k-means, neural nets) need it.',
    points: [
      'Fit the scaler on training data, then apply it to validation and test.',
      'Tree-based models do not need scaling.',
      'StandardScaler is the usual default.',
    ],
    example: {
      label: 'Standardise a feature by hand',
      lang: 'python',
      code: `from statistics import mean, pstdev

prices = [5.0, 8.0, 3.5, 12.0, 6.5]
mu, sigma = mean(prices), pstdev(prices)
scaled = [round((x - mu) / sigma, 2) for x in prices]
print("mean", round(mu, 2), "std", round(sigma, 2))
print("standardised:", scaled)`,
    },
    check: {
      question: 'Which model type does NOT require feature scaling?',
      options: ['K-nearest neighbours', 'Support vector machine', 'Decision tree / random forest', 'Neural network'],
      answer: 2,
      explanation: 'Trees split on one feature at a time by threshold, so the relative scale of features does not matter.',
    },
  },

  [`${A}/data-engineering/encoding-categorical-features`]: {
    answer: 'Models need numbers, so categorical features are encoded. One-hot encoding makes a 0/1 column per category (for unordered categories), ordinal encoding maps ordered categories to integers (poor < good < excellent), and target encoding replaces a category with its average target, used carefully to avoid leakage.',
    points: [
      'Never map unordered categories to plain integers; it invents a false order.',
      'One-hot encode nominal categories.',
      'Ordinal encode only genuinely ordered categories, stating the order.',
    ],
    example: {
      label: 'One-hot encoding by hand',
      lang: 'python',
      code: `rows = ["card", "cash", "card", "apple_pay"]
categories = sorted(set(rows))
for value in rows:
    one_hot = {c: int(c == value) for c in categories}
    print(value, one_hot)`,
    },
    check: {
      question: 'Why not encode {red, green, blue} as 0, 1, 2 for a linear model?',
      options: ['It uses too much memory', 'It implies a false ordering the model will learn', 'Colours cannot be numbers', 'It is too slow'],
      answer: 1,
      explanation: 'Integer codes suggest blue (2) is "more" than red (0); one-hot encoding avoids that.',
    },
  },

  [`${A}/data-engineering/feature-engineering`]: {
    answer: 'Feature engineering turns raw columns into inputs that carry signal: log-transforming skewed values, building interaction and ratio features, encoding cyclical values (hour, month) with sine and cosine, and aggregating history. Good features often beat a fancier model on raw ones.',
    points: [
      'Log-transform right-skewed positive columns for linear models.',
      'Encode cyclical features with sin and cos so December is near January.',
      'Do engineering inside a pipeline so it applies consistently.',
    ],
    example: {
      label: 'Cyclical encoding of the month',
      lang: 'python',
      code: `import math

for month in (1, 6, 12):
    angle = 2 * math.pi * (month - 1) / 12
    print(f"month {month:>2}: sin={math.sin(angle):+.2f}, cos={math.cos(angle):+.2f}")
# December (12) sits next to January (1) in this space`,
    },
    check: {
      question: 'Why encode the month as sine and cosine instead of 1–12?',
      options: ['It is smaller', 'So December and January are close, reflecting that the cycle wraps', 'Months are not numbers', 'It is required'],
      answer: 1,
      explanation: 'Raw integers put month 12 far from month 1; the sin/cos pair makes the cycle continuous.',
    },
  },

  [`${A}/data-engineering/train-val-test-split`]: {
    answer: 'Split data into three sets: training (the model fits here), validation (used to tune and choose) and test (a final honest score, touched once). Using the test set to make decisions quietly overfits it. Stratify to preserve class balance, and split time series by time, never randomly.',
    points: [
      'Tuning on the test set turns it into a second validation set.',
      'Stratified splits keep the class ratio in each part.',
      'Time-series splits must respect chronological order.',
    ],
    example: {
      label: 'A chronological split for time-series data',
      lang: 'python',
      code: `days = list(range(1, 11))        # ordered by time
train = days[:6]
val = days[6:8]
test = days[8:]
print("train:", train)
print("val:  ", val)
print("test: ", test, "— all later than train, never shuffled")`,
    },
    check: {
      question: 'Why use three splits instead of two?',
      options: ['It is traditional', 'Tuning on the test set overfits it, so a separate validation set is needed for decisions', 'Models need three', 'To use more data'],
      answer: 1,
      explanation: 'The test set must be touched only once; the validation set is where tuning decisions are made.',
    },
  },

  // ── Classical ML ─────────────────────────────────────────────────────────
  [`${A}/classical-ml/what-is-ml`]: {
    answer: 'Machine learning is examples in, rules out: you supply data and the algorithm encodes the patterns as a model. Training is a loop: predict, measure the error (loss), adjust the parameters to reduce it, and repeat until the loss stops improving.',
    points: [
      'Supervised learning uses labelled examples.',
      'Training minimises a loss by adjusting parameters.',
      'A good model generalises to new, unseen data.',
    ],
    example: {
      label: 'Learning a slope by reducing error',
      lang: 'python',
      code: `# fit y = w*x to points where the true w is 3
data = [(1, 3), (2, 6), (3, 9)]
w, lr = 0.0, 0.1
for epoch in range(5):
    grad = sum(-2 * x * (y - w * x) for x, y in data) / len(data)
    w -= lr * grad
    loss = sum((y - w * x) ** 2 for x, y in data) / len(data)
    print(f"epoch {epoch}: w = {w:.3f}, loss = {loss:.3f}")`,
    },
    check: {
      question: 'What happens in one training step?',
      options: ['The data is deleted', 'Predict, measure the error, adjust parameters to reduce it', 'The model is deployed', 'Features are scaled'],
      answer: 1,
      explanation: 'Training repeats predict-measure-adjust, nudging parameters toward lower loss.',
    },
  },

  [`${A}/classical-ml/linear-regression`]: {
    answer: 'Linear regression fits a straight line (or plane) that minimises the sum of squared errors between predictions and true values. The trained model is just weights (one slope per feature) and an intercept; a prediction is the dot product of weights and features plus the intercept.',
    points: [
      '"Least squares" names the objective it minimises.',
      'The model is a few numbers: coefficients and an intercept.',
      'It assumes a roughly linear relationship.',
    ],
    example: {
      label: 'Predict from learned weights',
      lang: 'python',
      code: `# model learned: minutes = 5*distance + 2*items + 10
weights = {"distance": 5, "items": 2}
intercept = 10

order = {"distance": 4, "items": 3}
prediction = sum(weights[f] * order[f] for f in weights) + intercept
print(f"predicted delivery time: {prediction} minutes")`,
    },
    check: {
      question: 'What does linear regression minimise?',
      options: ['The number of features', 'The sum of squared errors', 'The training time', 'The number of weights'],
      answer: 1,
      explanation: 'Ordinary least squares finds the line with the smallest total squared distance to the points.',
    },
  },

  [`${A}/classical-ml/logistic-regression`]: {
    answer: 'Logistic regression is a classification algorithm despite its name: it runs a linear equation through the sigmoid function to produce a probability between 0 and 1, then thresholds it. It is trained by minimising cross-entropy loss and is the foundation of classification.',
    points: [
      'Sigmoid σ(z) = 1/(1+e⁻ᶻ) maps any number to (0, 1).',
      'The output is a probability; a threshold (often 0.5) gives the class.',
      'Cross-entropy is its loss function.',
    ],
    example: {
      label: 'Sigmoid turns a score into a probability',
      lang: 'python',
      code: `import math

def sigmoid(z):
    return 1 / (1 + math.exp(-z))

for z in (-3, -0.5, 0, 1.5, 4):
    p = sigmoid(z)
    print(f"z={z:+.1f}  P={p:.3f}  class={'yes' if p >= 0.5 else 'no'}")`,
    },
    check: {
      question: 'What does the sigmoid function do in logistic regression?',
      options: ['Sorts the data', 'Maps the linear score to a probability between 0 and 1', 'Scales the features', 'Splits the data'],
      answer: 1,
      explanation: 'Sigmoid squashes any real number into (0, 1), turning the linear output into a probability.',
    },
  },

  [`${A}/classical-ml/decision-trees`]: {
    answer: 'A decision tree splits the data with if-then questions, choosing at each node the feature and threshold that best separate the classes, measured by Gini impurity or information gain. Trees are easy to read but overfit unless limited by depth or pruning.',
    points: [
      'Gini impurity is 0 for a pure node, 0.5 for a 50/50 binary mix.',
      'The tree greedily picks the split that most reduces impurity.',
      'Limit depth or prune to avoid overfitting.',
    ],
    example: {
      label: 'Gini impurity of a node',
      lang: 'python',
      code: `def gini(counts):
    total = sum(counts)
    return 1 - sum((c / total) ** 2 for c in counts)

print("pure (10 yes, 0 no):", gini([10, 0]))
print("mixed (5 yes, 5 no):", gini([5, 5]))
print("skewed (9 yes, 1 no):", round(gini([9, 1]), 3))`,
    },
    check: {
      question: 'What does a Gini impurity of 0 mean?',
      options: ['The node is empty', 'The node is pure: all samples are one class', 'The split failed', 'The tree is too deep'],
      answer: 1,
      explanation: 'Zero impurity means no mixing, so every sample in the node has the same label.',
    },
  },

  [`${A}/classical-ml/svm`]: {
    answer: 'A support vector machine finds the decision boundary with the widest margin between classes. Only the closest points, the support vectors, determine where it sits. The kernel trick lets it draw non-linear boundaries by implicitly mapping data to a higher-dimensional space.',
    points: [
      'A wider margin usually generalises better.',
      'Only the support vectors matter; other points can be removed.',
      'Kernels (RBF, polynomial) handle non-linear boundaries.',
    ],
    example: {
      label: 'Margin as the gap to the nearest points',
      lang: 'python',
      code: `# 1D toy: class A near 2, class B near 8; boundary midway
a_points, b_points = [1.5, 2.0, 2.5], [7.5, 8.0, 8.5]
boundary = (max(a_points) + min(b_points)) / 2
margin = min(b_points) - max(a_points)
print(f"boundary at {boundary}, margin width {margin}")
print("support vectors:", max(a_points), min(b_points))`,
    },
    check: {
      question: 'Which training points determine an SVM\'s boundary?',
      options: ['All of them equally', 'The support vectors, closest to the boundary', 'The farthest points', 'A random sample'],
      answer: 1,
      explanation: 'Only the nearest points (support vectors) fix the maximum-margin boundary; the rest are irrelevant.',
    },
  },

  [`${A}/classical-ml/knn`]: {
    answer: 'K-nearest neighbours makes no model during training; it just stores the data. To predict, it finds the k closest training points and takes a majority vote (or average). Because it is distance-based, features must be scaled, and it struggles in very high dimensions.',
    points: [
      'All the work happens at prediction time.',
      'Always scale features; distance is meaningless on raw scales.',
      'Choose k to balance noise (small k) and over-smoothing (large k).',
    ],
    example: {
      label: 'Classify by majority vote of the 3 nearest points',
      lang: 'python',
      code: `import math

train = [((1, 1), "A"), ((1, 2), "A"), ((5, 5), "B"), ((6, 5), "B"), ((5, 6), "B")]
query = (2, 2)

def dist(p, q):
    return math.hypot(p[0] - q[0], p[1] - q[1])

nearest = sorted(train, key=lambda item: dist(item[0], query))[:3]
labels = [label for _, label in nearest]
print("nearest labels:", labels, "-> predict", max(set(labels), key=labels.count))`,
    },
    check: {
      question: 'When does a KNN model do its computation?',
      options: ['During training', 'At prediction time, finding the nearest points', 'When loading data', 'Never'],
      answer: 1,
      explanation: 'KNN "trains" by storing the data; the distance search and vote happen when predicting.',
    },
  },

  [`${A}/classical-ml/naive-bayes`]: {
    answer: 'Naive Bayes applies Bayes\' theorem to classification, assuming features are independent given the class (the "naive" part). Despite that simplification it works well for text, such as spam filters. MultinomialNB suits word counts; GaussianNB suits continuous features.',
    points: [
      'It picks the class with the highest posterior probability.',
      'The independence assumption is rarely true but often good enough.',
      'It is fast and strong on high-dimensional text.',
    ],
    example: {
      label: 'A tiny naive Bayes spam score',
      lang: 'python',
      code: `# P(word | spam) learned from training counts
p_spam = 0.4
likelihood = {"free": 0.8, "meeting": 0.1}
words = ["free", "meeting"]

score_spam = p_spam
for w in words:
    score_spam *= likelihood[w]
print(f"unnormalised spam score: {score_spam:.3f}")`,
    },
    check: {
      question: 'What is the "naive" assumption in naive Bayes?',
      options: ['The data is small', 'Features are independent given the class', 'There are only two classes', 'The model is linear'],
      answer: 1,
      explanation: 'It assumes each feature contributes independently, which simplifies the maths and works surprisingly well.',
    },
  },

  [`${A}/classical-ml/random-forest`]: {
    answer: 'A random forest trains many decision trees on bootstrap samples of the data, each tree also choosing from a random subset of features at each split. Averaging their votes decorrelates errors and beats a single tree. Out-of-bag samples give a free validation estimate.',
    points: [
      'Bagging plus random feature subsets decorrelates the trees.',
      'Averaging many trees reduces variance.',
      'oob_score gives an unbiased estimate without a separate set.',
    ],
    example: {
      label: 'Averaging decorrelated trees reduces error (simulation)',
      lang: 'python',
      code: `import random
random.seed(0)

true = 100
def one_tree():
    return true + random.gauss(0, 15)      # each tree is noisy

single = one_tree()
forest = sum(one_tree() for _ in range(50)) / 50
print(f"single tree error: {abs(single - true):.1f}")
print(f"forest (50 trees) error: {abs(forest - true):.1f}")`,
    },
    check: {
      question: 'Why does a random forest beat a single decision tree?',
      options: ['Trees are faster', 'Averaging many decorrelated trees reduces variance', 'It uses more features', 'It never overfits'],
      answer: 1,
      explanation: 'Independent errors cancel out when votes are averaged, so the ensemble is more stable.',
    },
  },

  [`${A}/classical-ml/gradient-boosting`]: {
    answer: 'Gradient boosting trains trees in sequence, each new tree predicting the residual errors left by the trees before it. The predictions are added up, scaled by a learning rate. Fitting on residuals is gradient descent in function space, and it wins most tabular ML competitions.',
    points: [
      'Trees are built one after another, each correcting the last.',
      'A small learning rate with more trees generalises better.',
      'Residuals are the negative gradient of the squared-error loss.',
    ],
    example: {
      label: 'Boosting: each round fits the leftover error',
      lang: 'python',
      code: `targets = [10, 20, 30]
prediction = [sum(targets) / len(targets)] * 3   # start from the mean
lr = 0.5
for round_ in range(3):
    residuals = [t - p for t, p in zip(targets, prediction)]
    prediction = [p + lr * r for p, r in zip(prediction, residuals)]   # add a "tree" on residuals
    print(f"round {round_}: predictions {[round(p, 1) for p in prediction]}")`,
    },
    check: {
      question: 'What does each new tree in gradient boosting learn?',
      options: ['The original target again', 'The residual errors of the trees so far', 'A random subset', 'Nothing'],
      answer: 1,
      explanation: 'Each tree predicts what the current ensemble still gets wrong, steadily reducing the error.',
    },
  },

  [`${A}/classical-ml/xgboost`]: {
    answer: 'XGBoost is an optimised gradient boosting library that adds second-order gradients, L1/L2 regularisation and clever handling of missing values, which makes it fast and accurate on tabular data. Always use early stopping: set many trees and let it stop when validation stops improving.',
    points: [
      'Regularisation on leaf weights reduces overfitting.',
      'Early stopping picks the right number of trees automatically.',
      'SHAP values explain individual predictions.',
    ],
    example: {
      label: 'Training with early stopping (XGBoost)',
      lang: 'python',
      code: `import xgboost as xgb

model = xgb.XGBClassifier(n_estimators=2000, learning_rate=0.05,
                          max_depth=6, reg_lambda=1.0, eval_metric="auc")
model.fit(X_train, y_train,
          eval_set=[(X_val, y_val)],
          early_stopping_rounds=50, verbose=False)
print("best iteration:", model.best_iteration)`,
      static: true,
    },
    check: {
      question: 'Why use early stopping in XGBoost?',
      options: ['To train faster only', 'To stop adding trees once validation performance stops improving, avoiding overfitting', 'To use more memory', 'It is required'],
      answer: 1,
      explanation: 'Early stopping finds the number of trees that generalises best instead of overfitting with too many.',
    },
  },

  [`${A}/classical-ml/lightgbm`]: {
    answer: 'LightGBM is a gradient boosting library built for speed on large datasets. It bins features into histograms instead of testing every threshold, and grows trees leaf-wise (expanding the most promising leaf first), reaching lower loss faster than level-wise growth.',
    points: [
      'Histogram binning avoids evaluating every split point.',
      'Leaf-wise growth reaches lower loss for the same number of leaves.',
      'num_leaves is the key capacity parameter; cap it to avoid overfitting.',
    ],
    example: {
      label: 'Leaf-wise vs level-wise growth',
      lang: 'text',
      code: `Level-wise (XGBoost default): grow every node of a level before the next
Leaf-wise  (LightGBM):        grow the single leaf that reduces loss most

Leaf-wise reaches lower training loss faster, but can overfit —
control it with num_leaves and min_child_samples.`,
      static: true,
    },
    check: {
      question: 'How does LightGBM grow its trees?',
      options: ['Level by level', 'Leaf-wise: it expands the most promising leaf first', 'Randomly', 'All leaves at once'],
      answer: 1,
      explanation: 'Leaf-wise growth drops the loss fastest, which is part of why LightGBM trains quickly.',
    },
  },

  [`${A}/classical-ml/kmeans-clustering`]: {
    answer: 'K-means is unsupervised: it finds k groups by alternately assigning each point to its nearest centroid and moving each centroid to the mean of its points, until they stop moving. Scale features first, and pick k with the elbow method or silhouette score.',
    points: [
      'It needs no labels; it discovers structure.',
      'Always scale features, since it is distance-based.',
      'Choose k with the elbow of the inertia curve or silhouette scores.',
    ],
    example: {
      label: 'One k-means assignment step',
      lang: 'python',
      code: `points = [1, 2, 3, 10, 11, 12]
centroids = [2, 11]

clusters = {0: [], 1: []}
for p in points:
    nearest = min(range(len(centroids)), key=lambda i: abs(p - centroids[i]))
    clusters[nearest].append(p)

new_centroids = [sum(c) / len(c) for c in clusters.values()]
print("clusters:", clusters)
print("updated centroids:", new_centroids)`,
    },
    check: {
      question: 'What are the two repeating steps of k-means?',
      options: ['Split and merge', 'Assign points to nearest centroid, then move centroids to the mean', 'Sort and filter', 'Train and test'],
      answer: 1,
      explanation: 'It alternates assignment and centroid update until the centroids stabilise.',
    },
  },

  [`${A}/classical-ml/pca`]: {
    answer: 'Principal component analysis reduces dimensions by finding the directions of greatest variance (principal components) and projecting the data onto the top few. It compresses many correlated features into fewer while keeping most of the information. Standardise first, or large-scale features dominate.',
    points: [
      'Components are ordered by how much variance they explain.',
      'A scree plot shows how many components to keep.',
      'Standardise before PCA.',
    ],
    example: {
      label: 'How much variance the top components explain',
      lang: 'python',
      code: `explained = [0.62, 0.23, 0.08, 0.04, 0.03]   # variance ratio per component
cumulative = 0
for i, ratio in enumerate(explained, start=1):
    cumulative += ratio
    print(f"{i} component(s): {cumulative:.0%} of variance kept")
    if cumulative >= 0.9:
        print(f"-> keep {i} components to retain 90%")
        break`,
    },
    check: {
      question: 'What does PCA find?',
      options: ['The class labels', 'The directions of maximum variance to project onto', 'The nearest neighbours', 'Missing values'],
      answer: 1,
      explanation: 'PCA keeps the directions that explain the most variance and drops the rest.',
    },
  },
  // ── Evaluation ───────────────────────────────────────────────────────────
  [`${A}/evaluation/evaluation-metrics`]: {
    answer: 'Accuracy misleads on imbalanced data: always predicting the majority class can score 98% while catching no fraud. The confusion matrix (true/false positives and negatives) gives precision (of flagged, how many were right), recall (of real cases, how many were caught) and F1 (their balance).',
    points: [
      'Precision = TP / (TP + FP); recall = TP / (TP + FN).',
      'F1 is the harmonic mean of precision and recall.',
      'Choose the metric from the business cost of each error.',
    ],
    example: {
      label: 'Precision, recall and F1 from a confusion matrix',
      lang: 'python',
      code: `tp, fp, fn = 30, 10, 20          # caught, false alarms, missed
precision = tp / (tp + fp)
recall = tp / (tp + fn)
f1 = 2 * precision * recall / (precision + recall)
print(f"precision {precision:.2f}  recall {recall:.2f}  F1 {f1:.2f}")`,
    },
    check: {
      question: 'Why is accuracy a poor metric for a 1% fraud dataset?',
      options: ['It is hard to compute', 'Predicting "not fraud" always scores ~99% while catching nothing', 'It needs labels', 'It is too slow'],
      answer: 1,
      explanation: 'With heavy imbalance, the majority-class guess looks accurate but is useless; use precision and recall.',
    },
  },

  [`${A}/evaluation/calibration`]: {
    answer: 'A calibrated model\'s probabilities mean what they say: among cases it calls 80% likely, about 80% should be positive. This is separate from ranking quality (AUC). A reliability diagram checks it, and Platt scaling or isotonic regression fixes miscalibration.',
    points: [
      'A model can rank well (high AUC) yet be poorly calibrated.',
      'The reliability diagram compares predicted probability to actual frequency.',
      'Calibrate after training with Platt scaling or isotonic regression.',
    ],
    example: {
      label: 'Compare predicted probability to actual outcome rate',
      lang: 'python',
      code: `# predictions bucketed around 0.8; did ~80% actually happen?
bucket = [(0.8, 1), (0.8, 1), (0.8, 0), (0.8, 1), (0.8, 1)]
predicted = sum(p for p, _ in bucket) / len(bucket)
actual = sum(y for _, y in bucket) / len(bucket)
print(f"predicted {predicted:.0%}, actual {actual:.0%}",
      "-> well calibrated" if abs(predicted - actual) < 0.1 else "-> miscalibrated")`,
    },
    check: {
      question: 'What does a well-calibrated probability of 0.7 mean?',
      options: ['The model is 70% accurate', 'About 70% of cases given that score are actually positive', 'It ranks 7th', 'The feature is 0.7'],
      answer: 1,
      explanation: 'Calibration means the stated probability matches the real frequency of the outcome.',
    },
  },

  [`${A}/evaluation/roc-and-auc`]: {
    answer: 'The ROC curve plots the true positive rate against the false positive rate as the decision threshold sweeps across all values. The area under it (AUC) equals the probability that the model scores a random positive higher than a random negative; 0.5 is random, 1.0 is perfect.',
    points: [
      'Each threshold is one point on the curve.',
      'AUC is threshold-independent, good for comparing models.',
      'On heavy imbalance, prefer the precision-recall curve.',
    ],
    example: {
      label: 'AUC as the chance a positive outscores a negative',
      lang: 'python',
      code: `positives = [0.9, 0.8, 0.6]
negatives = [0.7, 0.4, 0.3]

wins = sum(1 for p in positives for n in negatives if p > n)
auc = wins / (len(positives) * len(negatives))
print(f"AUC = {auc:.2f}")`,
    },
    check: {
      question: 'What does an AUC of 0.5 indicate?',
      options: ['A perfect model', 'Random guessing', 'Half the data is positive', 'An error'],
      answer: 1,
      explanation: 'AUC 0.5 means the model ranks positives above negatives no better than chance.',
    },
  },

  [`${A}/evaluation/cross-validation`]: {
    answer: 'A single train/test split is a lottery that depends on which rows landed where. K-fold cross-validation splits the data into k parts, trains on k−1 and tests on the held-out part, k times, and averages the scores for a more reliable estimate with a sense of its variability.',
    points: [
      'It gives a mean score and a spread, not one number.',
      'Use stratified folds to keep class balance.',
      'A big gap between train and validation scores signals overfitting.',
    ],
    example: {
      label: 'Average and spread across 5 folds',
      lang: 'python',
      code: `from statistics import mean, pstdev

fold_scores = [0.81, 0.78, 0.84, 0.80, 0.77]
print(f"mean {mean(fold_scores):.3f} ± {pstdev(fold_scores):.3f}")
print("one split alone could have reported any single value above")`,
    },
    check: {
      question: 'What does k-fold cross-validation give over a single split?',
      options: ['Faster training', 'A more reliable score with a measure of its variability', 'More data', 'A deployed model'],
      answer: 1,
      explanation: 'Averaging over k held-out folds reduces the luck of one split and shows how much the score varies.',
    },
  },

  [`${A}/evaluation/hyperparameter-tuning`]: {
    answer: 'Hyperparameters (such as tree depth or learning rate) are set before training, not learned. Grid search tries every combination and explodes with more parameters; random search samples combinations; Bayesian optimisation (Optuna) uses past trials to propose promising ones, finding good settings in far fewer trials.',
    points: [
      'Grid search is exhaustive and does not scale past a few parameters.',
      'Random search often matches grid search with fewer trials.',
      'Optuna learns from previous trials to search smartly.',
    ],
    example: {
      label: 'Grid vs random search cost',
      lang: 'python',
      code: `params = {"max_depth": [3, 5, 7, 9], "learning_rate": [0.01, 0.05, 0.1], "subsample": [0.7, 0.9]}
grid = 1
for values in params.values():
    grid *= len(values)
print("grid search trials:", grid)
print("random search trials: whatever budget you set, e.g. 10")`,
    },
    check: {
      question: 'Why does grid search become impractical with many hyperparameters?',
      options: ['It is random', 'The number of combinations grows multiplicatively', 'It needs a GPU', 'It overfits'],
      answer: 1,
      explanation: 'Every added parameter multiplies the number of combinations, so the cost explodes.',
    },
  },

  [`${A}/evaluation/model-interpretability`]: {
    answer: 'Interpretability explains why a model made a prediction, which regulated industries require. Global methods (permutation importance) rank features overall; local methods (SHAP, LIME) explain one prediction by attributing it to each feature. SHAP values are grounded in game theory and are the most reliable.',
    points: [
      'Permutation importance measures the score drop when a feature is shuffled.',
      'SHAP attributes a prediction fairly across features.',
      'Built-in tree importances can be biased toward high-cardinality features.',
    ],
    example: {
      label: 'Permutation importance: how much a feature matters',
      lang: 'python',
      code: `baseline_score = 0.90
# re-score after shuffling each feature in turn
shuffled = {"distance": 0.72, "hour": 0.88, "items": 0.86}
for feature, score in shuffled.items():
    print(f"{feature:9} importance = {baseline_score - score:.2f}")`,
    },
    check: {
      question: 'What does permutation importance measure?',
      options: ['Training time', 'How much the score drops when a feature\'s values are shuffled', 'The feature\'s mean', 'The number of splits'],
      answer: 1,
      explanation: 'If shuffling a feature hurts the score a lot, the model relied on it heavily.',
    },
  },

  [`${A}/evaluation/regression-metrics`]: {
    answer: 'For numeric predictions, MAE averages the absolute errors (every mistake counts proportionally), RMSE squares them first (large errors hurt more), MAPE expresses error as a percentage, and R² is the share of variance the model explains, from 0 (no better than the mean) up to 1.',
    points: [
      'RMSE punishes large errors more than MAE.',
      'MAPE is scale-free but breaks when true values are near zero.',
      'R² = 1 means perfect; 0 means no better than predicting the mean.',
    ],
    example: {
      label: 'MAE and RMSE on the same errors',
      lang: 'python',
      code: `import math

actual = [30, 45, 20, 60]
predicted = [28, 50, 22, 40]
errors = [a - p for a, p in zip(actual, predicted)]
mae = sum(abs(e) for e in errors) / len(errors)
rmse = math.sqrt(sum(e * e for e in errors) / len(errors))
print(f"MAE {mae:.1f}  RMSE {rmse:.1f}  (RMSE is larger: one big 20-min miss dominates)")`,
    },
    check: {
      question: 'How does RMSE treat a large error compared with MAE?',
      options: ['The same', 'It penalises it more because errors are squared', 'It ignores it', 'It halves it'],
      answer: 1,
      explanation: 'Squaring makes big errors count disproportionately, so RMSE is sensitive to outliers.',
    },
  },

  // ── Deep learning ────────────────────────────────────────────────────────
  [`${A}/deep-learning/neural-networks-from-scratch`]: {
    answer: 'A neural network stacks layers of weighted sums followed by non-linear activations, learning its own features from raw data. One neuron computes z = Σ(wᵢxᵢ) + b then a = activation(z); a layer does the same for many neurons at once as a matrix multiply.',
    points: [
      'The non-linear activation is what lets networks learn complex patterns.',
      'A forward pass turns inputs into a prediction layer by layer.',
      'No manual feature engineering is needed.',
    ],
    example: {
      label: 'A forward pass through one neuron (ReLU)',
      lang: 'python',
      code: `def relu(z):
    return max(0.0, z)

inputs = [0.5, -1.0, 2.0]
weights = [0.4, 0.3, -0.1]
bias = 0.2

z = sum(w * x for w, x in zip(weights, inputs)) + bias
print("z =", round(z, 3), "-> activation =", relu(z))`,
    },
    check: {
      question: 'What does a neuron compute?',
      options: ['A random number', 'A weighted sum of its inputs plus a bias, then an activation', 'The average of inputs', 'The maximum input'],
      answer: 1,
      explanation: 'z = Σ wᵢxᵢ + b, then a non-linear activation a = f(z).',
    },
  },

  [`${A}/deep-learning/backpropagation`]: {
    answer: 'Backpropagation assigns credit for the output error to each weight by applying the chain rule backward through the network. Each layer computes the gradient for its own weights and the gradient to pass further back, so a single backward pass gives every weight\'s update direction.',
    points: [
      'It is the chain rule applied layer by layer, from loss to inputs.',
      'Each layer produces its own weight gradient and the gradient to pass back.',
      'The optimiser then steps the weights down these gradients.',
    ],
    example: {
      label: 'Chain rule through two steps',
      lang: 'python',
      code: `# forward: a = 2*x ; y = a + 1 ; loss = y^2, at x = 3
x = 3.0
a = 2 * x
y = a + 1
loss = y * y

# backward: chain the local derivatives
dloss_dy = 2 * y        # d(y^2)/dy
dy_da = 1               # d(a+1)/da
da_dx = 2               # d(2x)/dx
dloss_dx = dloss_dy * dy_da * da_dx
print("loss:", loss, "| dloss/dx:", dloss_dx)`,
    },
    check: {
      question: 'What mathematical rule is backpropagation built on?',
      options: ['The product rule only', 'The chain rule', 'Bayes\' theorem', 'The quadratic formula'],
      answer: 1,
      explanation: 'It chains local derivatives backward to find each weight\'s effect on the loss.',
    },
  },

  [`${A}/deep-learning/activation-functions`]: {
    answer: 'Activations add the non-linearity that lets networks learn. ReLU (max(0, x)) is the default hidden-layer choice: fast and free of vanishing gradients for positive inputs. Sigmoid and softmax belong at the output (binary and multi-class), paired with cross-entropy loss.',
    points: [
      'ReLU is the default; LeakyReLU helps if neurons "die".',
      'Softmax turns scores into a probability distribution over classes.',
      'Avoid sigmoid in hidden layers; its gradients vanish.',
    ],
    example: {
      label: 'Softmax turns scores into class probabilities',
      lang: 'python',
      code: `import math

scores = [2.0, 1.0, 0.1]
exps = [math.exp(s) for s in scores]
total = sum(exps)
probs = [round(e / total, 3) for e in exps]
print("probabilities:", probs, "sum =", round(sum(probs), 3))`,
    },
    check: {
      question: 'What is the usual default activation for hidden layers?',
      options: ['Sigmoid', 'ReLU', 'Softmax', 'Tanh'],
      answer: 1,
      explanation: 'ReLU is fast and avoids vanishing gradients for positive inputs, so it is the common default.',
    },
  },

  [`${A}/deep-learning/optimisers`]: {
    answer: 'Optimisers decide how weights move along their gradients. Plain SGD uses one learning rate; momentum smooths updates with a running average of past gradients; Adam keeps a per-weight adaptive rate; and AdamW fixes how weight decay is applied, which is why it is the common default.',
    points: [
      'Momentum dampens oscillation and speeds descent.',
      'Adam adapts the step size per weight from gradient history.',
      'AdamW decouples weight decay, improving generalisation.',
    ],
    example: {
      label: 'SGD with momentum vs plain SGD (simulation)',
      lang: 'python',
      code: `grads = [1.0, 0.8, -0.2, 0.6, -0.4]
plain, momentum, velocity = 0.0, 0.0, 0.0
lr, beta = 0.1, 0.9
for g in grads:
    plain -= lr * g
    velocity = beta * velocity + g
    momentum -= lr * velocity
print(f"plain SGD position:    {plain:.3f}")
print(f"with momentum position: {momentum:.3f}")`,
    },
    check: {
      question: 'What does Adam maintain for each weight?',
      options: ['One shared learning rate', 'An adaptive learning rate from gradient history', 'A fixed bias', 'A random seed'],
      answer: 1,
      explanation: 'Adam tracks moment estimates per weight, giving each its own effective step size.',
    },
  },

  [`${A}/deep-learning/batch-norm-dropout`]: {
    answer: 'Batch normalisation rescales each layer\'s activations to zero mean and unit variance per mini-batch (with learnable scale and shift), which stabilises and speeds training. Dropout randomly zeroes a fraction of activations during training to prevent co-adaptation, acting as regularisation.',
    points: [
      'BatchNorm steadies the distribution of activations between layers.',
      'Dropout is on during training and off at inference.',
      'Both improve how well a deep network trains and generalises.',
    ],
    example: {
      label: 'Dropout zeroes a fraction of activations (training only)',
      lang: 'python',
      code: `activations = [1.0, 2.0, 3.0, 4.0]
keep_mask = [1, 0, 1, 1]          # drop the 2nd unit this step
rate = 0.25
dropped = [a * m / (1 - rate) for a, m in zip(activations, keep_mask)]  # scale to keep the mean
print("after dropout:", [round(x, 2) for x in dropped])`,
    },
    check: {
      question: 'When is dropout active?',
      options: ['During training only', 'During inference only', 'Always', 'Never'],
      answer: 0,
      explanation: 'Dropout randomly zeroes units while training; at inference the full network is used.',
    },
  },

  [`${A}/deep-learning/cnns-image-classification`]: {
    answer: 'Convolutional neural networks process images by sliding small learnable filters across them, producing feature maps, and pooling to shrink them. This shares weights and gives spatial invariance, so a CNN recognises an object wherever it appears, with far fewer parameters than a dense network.',
    points: [
      'A filter detects a pattern anywhere in the image (weight sharing).',
      'Pooling reduces resolution and adds translation tolerance.',
      'Deeper layers detect higher-level features: edges → parts → objects.',
    ],
    example: {
      label: 'Output size of a convolution',
      lang: 'python',
      code: `def conv_output(size, kernel, padding, stride):
    return (size + 2 * padding - kernel) // stride + 1

print("224 input, 3x3 kernel, pad 1, stride 1 ->", conv_output(224, 3, 1, 1))
print("224 input, 3x3 kernel, pad 0, stride 2 ->", conv_output(224, 3, 0, 2))`,
    },
    check: {
      question: 'Why do CNNs use far fewer parameters than dense networks on images?',
      options: ['They ignore colour', 'Filters share weights across the whole image', 'They use smaller images', 'They skip training'],
      answer: 1,
      explanation: 'One filter is reused at every position, so the same small set of weights covers the image.',
    },
  },

  [`${A}/deep-learning/rnns-and-lstms`]: {
    answer: 'Recurrent networks process sequences by carrying a hidden state from step to step. Plain RNNs suffer vanishing gradients over long sequences, so early steps are forgotten. LSTMs add gates that decide what to keep, forget and output, letting them remember information across many steps.',
    points: [
      'The hidden state summarises everything seen so far.',
      'Vanishing gradients make plain RNNs forget distant context.',
      'LSTM gates control memory explicitly.',
    ],
    example: {
      label: 'Vanishing gradients over many steps',
      lang: 'python',
      code: `derivative = 0.7          # a typical tanh-derivative magnitude
for steps in (5, 20, 50):
    print(f"gradient after {steps:>2} steps: {derivative ** steps:.2e}")`,
    },
    check: {
      question: 'What problem do LSTM gates solve in plain RNNs?',
      options: ['Slow matrix multiply', 'Vanishing gradients that erase long-range memory', 'Too many parameters', 'Overfitting only'],
      answer: 1,
      explanation: 'Gates let the cell retain information over long sequences instead of letting gradients vanish.',
    },
  },

  [`${A}/deep-learning/transformers-and-attention`]: {
    answer: 'Transformers process all tokens at once using self-attention: for each token it forms a query, key and value, scores its query against every key, scales by √dₖ, softmaxes to weights, and mixes the values. This captures long-range relationships with no sequential bottleneck, powering GPT and BERT.',
    points: [
      'Attention relates every token to every other token in parallel.',
      'Scaling by √dₖ keeps softmax gradients healthy.',
      'No recurrence means it parallelises well on GPUs.',
    ],
    example: {
      label: 'Attention weights from query-key scores',
      lang: 'python',
      code: `import math

def softmax(xs):
    m = max(xs)
    exps = [math.exp(x - m) for x in xs]
    total = sum(exps)
    return [round(e / total, 3) for e in exps]

d_k = 4
scores = [8.0, 2.0, 5.0]                     # one query against three keys
scaled = [s / math.sqrt(d_k) for s in scores]
print("attention weights:", softmax(scaled))`,
    },
    check: {
      question: 'Why does self-attention scale the scores by √dₖ?',
      options: ['To save memory', 'To stop large dot products from saturating softmax and killing gradients', 'To sort tokens', 'To add positions'],
      answer: 1,
      explanation: 'Without scaling, big dot products push softmax to one-hot and gradients vanish.',
    },
  },

  // ── NLP ──────────────────────────────────────────────────────────────────
  [`${A}/nlp/tokenisation-and-embeddings`]: {
    answer: 'Tokenisation turns text into integer token IDs before a model sees it. Subword methods such as Byte Pair Encoding start from characters and merge frequent pairs, handling rare and unseen words without a huge vocabulary. Embeddings then map each token ID to a dense vector that captures meaning.',
    points: [
      'Word-level tokenisation struggles with unknown words; subword avoids it.',
      'BPE merges the most frequent adjacent pair repeatedly.',
      'Embeddings place similar meanings near each other in vector space.',
    ],
    example: {
      label: 'One Byte Pair Encoding merge step',
      lang: 'python',
      code: `from collections import Counter

tokens = list("low lower lowest")
pairs = Counter(zip(tokens, tokens[1:]))
best = pairs.most_common(1)[0]
print("most frequent adjacent pair:", best[0], "->", best[1], "times")
print("BPE would merge it into a single new token")`,
    },
    check: {
      question: 'Why do modern tokenisers use subword units like BPE?',
      options: ['They are shorter', 'They handle rare and unseen words without an enormous vocabulary', 'They need no training', 'They ignore spaces'],
      answer: 1,
      explanation: 'Subwords compose any word from known pieces, avoiding the out-of-vocabulary problem.',
    },
  },

  [`${A}/nlp/bert-encoder-family`]: {
    answer: 'BERT is a Transformer encoder with bidirectional attention: every token sees both left and right context, which makes it strong at understanding tasks such as classification and named-entity recognition. It is pretrained by masking some tokens and predicting them, then fine-tuned on a specific task.',
    points: [
      'Bidirectional attention reads the whole sentence at once.',
      'Masked language modelling is its main pretraining objective.',
      'Fine-tune by adding a small task head on top.',
    ],
    example: {
      label: 'The masked language modelling objective',
      lang: 'text',
      code: `Input:  "The data [MASK] refreshes every night."
Target: predict the masked token  → "pipeline"

BERT sees words on both sides of [MASK], unlike a left-to-right model.`,
      static: true,
    },
    check: {
      question: 'What makes BERT good at understanding tasks?',
      options: ['It generates text left to right', 'Bidirectional attention: each token sees both sides', 'It is very small', 'It uses no attention'],
      answer: 1,
      explanation: 'Seeing full context in both directions suits classification and tagging.',
    },
  },

  [`${A}/nlp/peft-lora-adapters`]: {
    answer: 'Parameter-efficient fine-tuning adapts a large model by training a tiny number of extra parameters while freezing the rest. LoRA adds two small low-rank matrices beside each weight matrix and trains only those, fitting a big model on a single modest GPU and keeping most of full fine-tuning\'s quality.',
    points: [
      'Only a fraction of a percent of parameters are trained.',
      'LoRA\'s update is a low-rank approximation B @ A of the weight change.',
      'The base model stays frozen and shared across tasks.',
    ],
    example: {
      label: 'How few parameters LoRA trains',
      lang: 'python',
      code: `d = 4096          # a weight matrix is d x d
rank = 8          # LoRA rank
full = d * d
lora = d * rank + rank * d        # two small matrices A and B
print(f"full fine-tune: {full:,} params")
print(f"LoRA:           {lora:,} params ({lora / full:.2%})")`,
    },
    check: {
      question: 'What does LoRA train instead of the full weight matrix?',
      options: ['Nothing', 'Two small low-rank matrices added alongside the frozen weights', 'The input data', 'The optimiser'],
      answer: 1,
      explanation: 'LoRA learns a small low-rank update while the original weights stay frozen.',
    },
  },

  [`${A}/nlp/rag-retrieval-augmented-generation`]: {
    answer: 'Retrieval-augmented generation gives a language model access to documents it was never trained on. Documents are chunked, embedded and stored in a vector database; at query time the most similar chunks are retrieved and passed to the model as context, so answers are grounded in your data.',
    points: [
      'Two phases: index the documents, then retrieve and generate.',
      'Chunking quality is the biggest lever on answer quality.',
      'Retrieval reduces hallucination by grounding answers in sources.',
    ],
    example: {
      label: 'Retrieve the most similar chunk by cosine similarity',
      lang: 'python',
      code: `import math

def cosine(a, b):
    dot = sum(x * y for x, y in zip(a, b))
    return dot / (math.sqrt(sum(x * x for x in a)) * math.sqrt(sum(y * y for y in b)))

query = [1, 0, 1]
chunks = {"refunds": [1, 0, 1], "pricing": [0, 1, 0], "shipping": [1, 1, 0]}
best = max(chunks, key=lambda c: cosine(query, chunks[c]))
print("retrieved chunk:", best)`,
    },
    check: {
      question: 'What problem does RAG mainly reduce?',
      options: ['Slow training', 'Hallucination, by grounding answers in retrieved documents', 'High memory', 'Tokenisation errors'],
      answer: 1,
      explanation: 'Supplying relevant source text as context keeps the model\'s answers factual.',
    },
  },

  [`${A}/nlp/prompt-engineering`]: {
    answer: 'Prompt engineering shapes an LLM\'s output through its input. Zero-shot states the task; few-shot adds a handful of input-output examples to fix the format or style; chain-of-thought asks the model to reason step by step, which sharply improves multi-step problems.',
    points: [
      'Few-shot examples teach the output format by demonstration.',
      '"Let\'s think step by step" improves reasoning.',
      'Be specific about role, format and constraints.',
    ],
    example: {
      label: 'A few-shot prompt fixes the output format',
      lang: 'text',
      code: `Classify sentiment as POSITIVE or NEGATIVE.

Review: "Fast delivery, loved it"   -> POSITIVE
Review: "Arrived broken, no reply"  -> NEGATIVE
Review: "Exactly as described"      ->`,
      static: true,
    },
    check: {
      question: 'What does chain-of-thought prompting improve most?',
      options: ['Spelling', 'Multi-step reasoning', 'Response speed', 'Token cost'],
      answer: 1,
      explanation: 'Asking for step-by-step reasoning helps the model work through multi-step problems correctly.',
    },
  },

  [`${A}/nlp/llm-agents-and-tool-use`]: {
    answer: 'An agent is an LLM that can take actions, not just produce text, by calling tools (functions, APIs, code). Function calling is the reliable pattern: you define tools as JSON schemas, the model returns a structured call, your code runs it, and the result goes back for the next step.',
    points: [
      'The loop is: user → model picks a tool → run it → feed the result back.',
      'JSON-schema tool definitions avoid brittle text parsing.',
      'Production agents need loop detection and guardrails.',
    ],
    example: {
      label: 'The function-calling message loop',
      lang: 'python',
      code: `def get_weather(city):
    return {"seattle": "12C rain", "austin": "27C sunny"}[city.lower()]

# the model returns a structured call instead of free text
tool_call = {"name": "get_weather", "arguments": {"city": "Austin"}}
result = get_weather(**tool_call["arguments"])
print("tool result fed back to the model:", result)`,
    },
    check: {
      question: 'Why define tools with JSON schemas for an agent?',
      options: ['To save tokens', 'So the model returns structured calls instead of text that must be parsed', 'To encrypt them', 'They run faster'],
      answer: 1,
      explanation: 'Structured calls remove the fragility of parsing free-form text for arguments.',
    },
  },

  // ── Computer vision ──────────────────────────────────────────────────────
  [`${A}/computer-vision/image-fundamentals`]: {
    answer: 'A digital image is a 3D array of pixel values: height × width × channels (RGB has 3). Before a model, images are loaded, converted to tensors (scaling 0–255 to 0–1), and normalised per channel. PyTorch expects channels-first (C, H, W).',
    points: [
      'RGB pixels range 0–255; ToTensor scales them to 0–1.',
      'Normalise with dataset mean and standard deviation per channel.',
      'PyTorch uses (C, H, W); PIL and NumPy use (H, W, C).',
    ],
    example: {
      label: 'Normalise a pixel value',
      lang: 'python',
      code: `pixel = 200                 # 0-255
scaled = pixel / 255        # ToTensor
mean, std = 0.485, 0.229    # ImageNet red-channel stats
normalised = (scaled - mean) / std
print(f"raw {pixel} -> scaled {scaled:.3f} -> normalised {normalised:.3f}")`,
    },
    check: {
      question: 'What shape does PyTorch expect for an image tensor?',
      options: ['(H, W, C)', '(C, H, W)', '(W, H, C)', '(H, W)'],
      answer: 1,
      explanation: 'PyTorch is channels-first: (channels, height, width).',
    },
  },

  [`${A}/computer-vision/data-augmentation`]: {
    answer: 'Data augmentation multiplies a training set by applying label-preserving transforms: flips, crops, rotations, colour jitter, mixup and cutout. Each teaches an invariance (a flipped cat is still a cat), reducing overfitting. Augment only during training; validation transforms must be deterministic.',
    points: [
      'Each augmentation teaches a specific invariance.',
      'Only augment training data, never validation or test.',
      'Do not apply transforms that change the label.',
    ],
    example: {
      label: 'Augmentation applies in training, not validation (torchvision)',
      lang: 'python',
      code: `import torchvision.transforms as T

train_tf = T.Compose([T.RandomResizedCrop(224), T.RandomHorizontalFlip(),
                      T.ColorJitter(0.2, 0.2), T.ToTensor()])
val_tf = T.Compose([T.Resize(256), T.CenterCrop(224), T.ToTensor()])  # deterministic`,
      static: true,
    },
    check: {
      question: 'When should data augmentation be applied?',
      options: ['Training only', 'Validation only', 'Always', 'Never'],
      answer: 0,
      explanation: 'Augmenting validation or test data would make evaluation inconsistent and misleading.',
    },
  },

  [`${A}/computer-vision/object-detection`]: {
    answer: 'Object detection finds and labels every object in an image with bounding boxes, confidence scores and classes. Models predict many candidate boxes; Intersection over Union measures overlap with the truth, and non-maximum suppression removes duplicate boxes for the same object. YOLO made it real-time.',
    points: [
      'IoU = intersection area / union area; ≥ 0.5 is a common match threshold.',
      'Non-maximum suppression keeps the best box and drops overlapping ones.',
      'YOLO predicts boxes in one pass, enabling real-time detection.',
    ],
    example: {
      label: 'Intersection over Union of two boxes',
      lang: 'python',
      code: `def iou(a, b):   # boxes as (x1, y1, x2, y2)
    ix1, iy1 = max(a[0], b[0]), max(a[1], b[1])
    ix2, iy2 = min(a[2], b[2]), min(a[3], b[3])
    inter = max(0, ix2 - ix1) * max(0, iy2 - iy1)
    area_a = (a[2] - a[0]) * (a[3] - a[1])
    area_b = (b[2] - b[0]) * (b[3] - b[1])
    return inter / (area_a + area_b - inter)

print("IoU:", round(iou((0, 0, 4, 4), (2, 2, 6, 6)), 3))`,
    },
    check: {
      question: 'What does non-maximum suppression do?',
      options: ['Trains the model', 'Removes duplicate overlapping boxes for the same object', 'Resizes the image', 'Adds boxes'],
      answer: 1,
      explanation: 'It keeps the highest-confidence box and suppresses others that overlap it heavily.',
    },
  },

  [`${A}/computer-vision/semantic-segmentation`]: {
    answer: 'Semantic segmentation labels every pixel with a class, producing a mask rather than a box, which suits medical imaging and self-driving cars. The U-Net architecture has an encoder that downsamples to capture context and a decoder that upsamples to restore resolution, with skip connections preserving detail.',
    points: [
      'The output is a per-pixel class map, not a bounding box.',
      'Skip connections carry fine detail from encoder to decoder.',
      'It distinguishes "what" at the level of each pixel.',
    ],
    example: {
      label: 'Detection vs segmentation output',
      lang: 'text',
      code: `Classification: one label for the whole image        -> "cat"
Detection:      boxes + labels                        -> cat @ (x1,y1,x2,y2)
Segmentation:   a class for every pixel (a mask)      -> cat-shaped region`,
      static: true,
    },
    check: {
      question: 'What does semantic segmentation output?',
      options: ['One label per image', 'A bounding box', 'A class label for every pixel', 'A probability'],
      answer: 2,
      explanation: 'It produces a mask assigning each pixel to a class.',
    },
  },

  [`${A}/computer-vision/transfer-learning`]: {
    answer: 'Transfer learning starts from a model pretrained on a large dataset (such as ImageNet) and adapts it to a new task. Early layers capture universal features (edges, textures) worth keeping. Feature extraction freezes the backbone and trains only a new head; fine-tuning unfreezes some layers too.',
    points: [
      'Feature extraction suits small or similar-domain datasets.',
      'Fine-tuning suits larger datasets or different domains.',
      'It reaches strong accuracy with far less data and compute.',
    ],
    example: {
      label: 'Freeze the backbone, train a new head (PyTorch)',
      lang: 'python',
      code: `import torchvision.models as models
import torch.nn as nn

model = models.resnet50(weights="IMAGENET1K_V2")
for param in model.parameters():
    param.requires_grad = False          # freeze the backbone
model.fc = nn.Linear(model.fc.in_features, 5)   # new 5-class head, trainable`,
      static: true,
    },
    check: {
      question: 'For a small dataset similar to ImageNet, which approach fits best?',
      options: ['Train from scratch', 'Feature extraction: freeze the backbone, train only the head', 'Use no pretrained weights', 'Fine-tune every layer'],
      answer: 1,
      explanation: 'With little data, freezing the pretrained features and training a small head avoids overfitting.',
    },
  },

  // ── Generative AI ────────────────────────────────────────────────────────
  [`${A}/generative-ai/what-is-generative-ai`]: {
    answer: 'Generative models learn the full data distribution P(data) and can sample new examples from it, unlike discriminative models that learn P(label | data) to classify. The main families are GANs (sharp images, unstable), VAEs (smooth latent space, blurrier), diffusion models (state of the art images) and LLMs (text).',
    points: [
      'Discriminative models classify; generative models create.',
      'Each family trades off sharpness, stability and control.',
      'Diffusion models power most modern image generators.',
    ],
    example: {
      label: 'Discriminative vs generative, in one line each',
      lang: 'text',
      code: `Discriminative: given this email, is it spam?        P(label | data)
Generative:     write me a new email in this style    P(data)  -> sample`,
      static: true,
    },
    check: {
      question: 'What do generative models learn?',
      options: ['P(label | data)', 'P(data), the full distribution they can sample from', 'Only the labels', 'The learning rate'],
      answer: 1,
      explanation: 'Modelling the data distribution lets them generate new, realistic examples.',
    },
  },

  [`${A}/generative-ai/context-windows-model-limits`]: {
    answer: 'A context window is a token budget for the model request. Budget instructions, the current question, history, retrieved passages, tool content, and output capacity according to the selected model and provider; fitting more text does not guarantee the model will use every detail reliably.',
    points: [
      'Token counts depend on the tokenizer and exact request content.',
      'Reserve output capacity and count tool schemas and results as well as visible chat text.',
      'Trim duplicate or low-relevance context, preserve critical constraints, and make omissions observable.',
    ],
    example: {
      label: 'A hypothetical request budget',
      lang: 'text',
      code: `Instructions       600
Current question   250
History           1450
Retrieved text    3500
Tools               650
Output reserve      900
----------------------
Total             7350  (350 above a 7000-token limit)`,
      static: true,
    },
    check: {
      question: 'What should you do first when a request exceeds the selected model’s context budget?',
      options: [
        'Silently delete the oldest messages',
        'Count the full request, preserve required instructions and the current task, and trim low-value context explicitly',
        'Remove the output reserve',
        'Assume the provider will truncate it safely',
      ],
      answer: 1,
      explanation: 'Count all request components, preserve required constraints and the current question, and make any trimming or summarisation explicit.',
    },
  },

  [`${A}/generative-ai/inference-parameters-model-selection`]: {
    answer: 'Choose models and inference settings by testing representative tasks against correctness, format reliability, latency, cost, and deployment requirements. Sampling parameters influence output selection but do not guarantee a correct answer, and parameter behavior varies by provider and model.',
    points: [
      'Record the exact model identifier and test date; names, limits, and features change.',
      'Change one parameter at a time and evaluate with fixed examples and prompts.',
      'Validate structured outputs and tool actions in the application even when model features constrain format.',
    ],
    example: {
      label: 'Controlled comparison checklist',
      lang: 'text',
      code: `Hold fixed: evaluation inputs, prompt version, model version
Change:    one supported parameter
Measure:   task correctness, valid format, latency, token usage
Keep:      the setting only if the task-specific trade-off improves`,
      static: true,
    },
    check: {
      question: 'What is the reliable way to choose a generation setting?',
      options: [
        'Always set temperature to zero',
        'Change several settings until the answer sounds better',
        'Compare one change at a time on fixed, representative tasks and measure the relevant outcomes',
        'Use the same settings for every model provider',
      ],
      answer: 2,
      explanation: 'Controlled comparisons isolate the effect of a setting, and task-specific measures show whether the change is useful.',
    },
  },

  [`${A}/generative-ai/gans-generator-discriminator`]: {
    answer: 'A GAN trains two networks against each other: a generator that turns random noise into fake data, and a discriminator that tries to tell real from fake. As the discriminator improves, it pushes the generator to make more convincing samples. Training is powerful but prone to instability and mode collapse.',
    points: [
      'The generator and discriminator improve by competing.',
      'Mode collapse is when the generator makes only a few outputs.',
      'Wasserstein GANs stabilise the notoriously tricky training.',
    ],
    example: {
      label: 'The adversarial objective (simulation)',
      lang: 'python',
      code: `# discriminator outputs P(real); generator wants it near 1 for fakes
d_on_real, d_on_fake = 0.9, 0.2
d_loss = -(0.5 * (d_on_real) + 0.5 * (1 - d_on_fake))   # wants real high, fake low
g_loss = -(d_on_fake)                                    # wants fake judged real
print(f"discriminator loss {d_loss:.2f}, generator loss {g_loss:.2f}")`,
    },
    check: {
      question: 'What is mode collapse in a GAN?',
      options: ['The discriminator wins forever', 'The generator produces only a few repeated outputs', 'Training is too slow', 'The images are too sharp'],
      answer: 1,
      explanation: 'The generator finds a narrow set of outputs that fool the discriminator and stops exploring.',
    },
  },

  [`${A}/generative-ai/variational-autoencoders`]: {
    answer: 'A variational autoencoder maps each input to a probability distribution in latent space rather than a single point, so the space is smooth and samples between points decode to sensible outputs. The reparameterisation trick (z = μ + σ·ε) keeps it trainable, and a KL term keeps the latent space regular.',
    points: [
      'The encoder outputs a mean and variance, not a fixed code.',
      'The reparameterisation trick lets gradients flow through sampling.',
      'VAEs give controllable generation but blurrier outputs than GANs.',
    ],
    example: {
      label: 'The reparameterisation trick',
      lang: 'python',
      code: `import random
random.seed(0)

mu, sigma = 2.0, 0.5
epsilon = random.gauss(0, 1)        # noise, independent of the parameters
z = mu + sigma * epsilon            # differentiable w.r.t. mu and sigma
print(f"sampled latent z = {z:.3f}")`,
    },
    check: {
      question: 'Why does a VAE use the reparameterisation trick?',
      options: ['To speed up decoding', 'So gradients can flow through the sampling step during training', 'To add colour', 'To remove noise'],
      answer: 1,
      explanation: 'Writing z = μ + σ·ε moves the randomness outside the parameters so they stay differentiable.',
    },
  },

  [`${A}/generative-ai/diffusion-models`]: {
    answer: 'Diffusion models learn to reverse a gradual noising process. The forward process adds Gaussian noise to an image over many steps until it is pure noise; the model is trained to predict and remove that noise, so at generation time it starts from noise and denoises step by step into an image.',
    points: [
      'Training teaches the model to predict the noise added at each step.',
      'Generation denoises from random noise to a clean image.',
      'Latent diffusion (Stable Diffusion) works in a compressed space for speed.',
    ],
    example: {
      label: 'The forward noising schedule',
      lang: 'python',
      code: `import math

# cumulative signal retained at step t (toy schedule)
for t in (0, 250, 500, 1000):
    alpha_bar = math.cos((t / 1000) * math.pi / 2) ** 2
    print(f"step {t:>4}: {alpha_bar:.2%} signal, {1 - alpha_bar:.2%} noise")`,
    },
    check: {
      question: 'What is a diffusion model trained to do?',
      options: ['Classify images', 'Predict and remove the noise added at each step', 'Compress files', 'Sort pixels'],
      answer: 1,
      explanation: 'By learning to denoise, it can start from pure noise and reverse the process into an image.',
    },
  },

  [`${A}/generative-ai/llms-pretraining-rlhf`]: {
    answer: 'Large language models are decoder-only Transformers trained to predict the next token over huge text corpora. After this pretraining they are instruction-tuned and aligned with human preferences, through RLHF or methods like DPO, to be helpful and safe. Scaling laws relate capability to model size and data.',
    points: [
      'Pretraining is next-token prediction with cross-entropy loss.',
      'Alignment (RLHF, DPO) tunes behaviour to human preferences.',
      'Scaling laws guide how to balance parameters and training data.',
    ],
    example: {
      label: 'Next-token prediction as a probability over the vocabulary',
      lang: 'python',
      code: `import math

context = "the data pipeline"
# toy scores for candidate next tokens
scores = {"refreshes": 4.0, "failed": 2.0, "banana": -1.0}
exps = {w: math.exp(s) for w, s in scores.items()}
total = sum(exps.values())
for w, e in sorted(exps.items(), key=lambda kv: -kv[1]):
    print(f"{w:10} P = {e / total:.2%}")`,
    },
    check: {
      question: 'What objective is an LLM pretrained on?',
      options: ['Image classification', 'Predicting the next token', 'Clustering', 'Translation only'],
      answer: 1,
      explanation: 'Pretraining maximises the probability of the next token across vast amounts of text.',
    },
  },

  [`${A}/generative-ai/llm-fine-tuning`]: {
    answer: 'Fine-tuning adapts a pretrained LLM to a specific task or style by training further on your examples. Reach for it only after prompting and RAG fall short: prompting is instant and flexible, RAG adds knowledge, and fine-tuning changes behaviour. A few hundred high-quality examples beat thousands of mediocre ones.',
    points: [
      'Decision order: prompt → RAG → fine-tune.',
      'Data quality matters more than quantity.',
      'LoRA makes fine-tuning affordable on one GPU.',
    ],
    example: {
      label: 'When to fine-tune vs prompt vs RAG',
      lang: 'text',
      code: `Need a different output format or tone?      try prompting first
Need the model to know your documents?        use RAG
Need consistent behaviour prompting can't get? fine-tune (often with LoRA)`,
      static: true,
    },
    check: {
      question: 'What should you usually try before fine-tuning?',
      options: ['Nothing', 'Prompt engineering and RAG', 'Training from scratch', 'A bigger GPU'],
      answer: 1,
      explanation: 'Prompting and RAG are faster and cheaper; fine-tune only when they cannot get you there.',
    },
  },

  [`${A}/generative-ai/multimodal-models`]: {
    answer: 'Multimodal models handle more than one kind of input together. CLIP trains an image encoder and a text encoder so matching image-text pairs land near each other in a shared space, enabling zero-shot image classification. LLaVA connects a vision encoder to an LLM for visual question answering.',
    points: [
      'CLIP aligns images and text in one embedding space with contrastive loss.',
      'Zero-shot: classify an image by which text label it is closest to.',
      'Vision-language models answer questions about images.',
    ],
    example: {
      label: 'Zero-shot classification by nearest text label (cosine)',
      lang: 'python',
      code: `import math

def cosine(a, b):
    dot = sum(x * y for x, y in zip(a, b))
    return dot / (math.sqrt(sum(x*x for x in a)) * math.sqrt(sum(y*y for y in b)))

image = [0.9, 0.1, 0.2]                       # image embedding
labels = {"a cat": [0.8, 0.2, 0.1], "a car": [0.1, 0.9, 0.0]}
best = max(labels, key=lambda t: cosine(image, labels[t]))
print("predicted label:", best)`,
    },
    check: {
      question: 'How does CLIP enable zero-shot image classification?',
      options: ['It memorises labels', 'Images and text share an embedding space, so an image is matched to the nearest text label', 'It uses no text', 'It trains per class'],
      answer: 1,
      explanation: 'Because image and text embeddings are comparable, you classify by closest label with no task-specific training.',
    },
  },

  [`${A}/generative-ai/advanced-rag`]: {
    answer: 'Production RAG improves on naive "embed and take top-k". Hybrid search combines dense (semantic) and sparse (keyword, BM25) retrieval; a reranker reorders the retrieved chunks by relevance; and evaluation metrics measure retrieval and answer quality, so the system can be tuned rather than guessed at.',
    points: [
      'Hybrid search catches both meaning and exact keywords.',
      'A reranker promotes the truly relevant chunks before generation.',
      'Measure retrieval and faithfulness instead of eyeballing answers.',
    ],
    example: {
      label: 'Reciprocal Rank Fusion merges two rankings',
      lang: 'python',
      code: `dense = ["A", "B", "C"]        # semantic ranking
sparse = ["C", "A", "D"]       # keyword ranking
k = 60
scores = {}
for ranking in (dense, sparse):
    for rank, doc in enumerate(ranking, start=1):
        scores[doc] = scores.get(doc, 0) + 1 / (k + rank)
print(sorted(scores, key=scores.get, reverse=True))`,
    },
    check: {
      question: 'What does hybrid search combine?',
      options: ['Two models', 'Dense semantic retrieval and sparse keyword retrieval', 'Images and text', 'Training and inference'],
      answer: 1,
      explanation: 'Fusing embeddings and keyword matching catches both meaning and exact terms.',
    },
  },

  [`${A}/generative-ai/agents-tool-use`]: {
    answer: 'Production AI agents plan and carry out multi-step tasks by calling tools in a loop, deciding the next action from the result of the last. What separates them from demos is reliability: structured tool calling, loop detection, confirmation before risky actions, and limits on steps and cost.',
    points: [
      'ReAct interleaves reasoning and acting.',
      'Structured JSON tool calls avoid parsing failures.',
      'Guardrails (step limits, confirmations, loop detection) make them safe.',
    ],
    example: {
      label: 'A step limit stops runaway agent loops',
      lang: 'python',
      code: `MAX_STEPS = 5
history = []

def step(action):
    if len(history) >= MAX_STEPS:
        return "stopped: step limit reached"
    if action in history:
        return "stopped: loop detected"
    history.append(action)
    return f"ran {action}"

for a in ["search", "search", "read", "search"]:
    print(step(a))`,
    },
    check: {
      question: 'What mainly separates a production agent from a demo one?',
      options: ['A bigger model', 'Error handling and guardrails such as loop detection and step limits', 'More tools', 'Faster hardware'],
      answer: 1,
      explanation: 'Reliability features, not raw capability, keep an agent from looping or acting unsafely.',
    },
  },

  // ── MLOps ────────────────────────────────────────────────────────────────
  [`${A}/mlops/ml-pipelines-feature-stores`]: {
    answer: 'Production ML runs on three pipelines: a feature pipeline (raw events → features in a feature store), a training pipeline (features → model), and an inference pipeline (features → predictions). A feature store has an offline layer for training and an online layer for low-latency serving, keeping them consistent.',
    points: [
      'The feature store prevents training/serving skew.',
      'Offline store = history for training; online store = latest for serving.',
      'Point-in-time joins avoid leaking future data into training.',
    ],
    example: {
      label: 'The three pipelines',
      lang: 'text',
      code: `Feature pipeline   raw events  -> features        (hourly/daily)
Training pipeline  features    -> trained model    (on schedule/trigger)
Inference pipeline features    -> predictions       (real time or batch)
Feature store keeps offline (training) and online (serving) in sync.`,
      static: true,
    },
    check: {
      question: 'What does a feature store\'s online layer provide?',
      options: ['Full history for training', 'The latest feature values for low-latency serving', 'Model weights', 'Dashboards'],
      answer: 1,
      explanation: 'The online store serves current features fast; the offline store holds history for training.',
    },
  },

  [`${A}/mlops/experiment-tracking`]: {
    answer: 'Experiment tracking records every run\'s parameters, metrics and artifacts so experiments are comparable and reproducible, and good models are never lost. MLflow and Weights & Biases log runs automatically and register versioned models that can be promoted from staging to production.',
    points: [
      'Log parameters (inputs), metrics (outputs) and artifacts (the model).',
      'Compare runs instead of relying on memory or notebooks.',
      'A model registry versions and promotes models.',
    ],
    example: {
      label: 'Logging a run (MLflow)',
      lang: 'python',
      code: `import mlflow

with mlflow.start_run():
    mlflow.log_param("max_depth", 6)
    mlflow.log_param("learning_rate", 0.05)
    mlflow.log_metric("val_auc", 0.912)
    mlflow.sklearn.log_model(model, "model")`,
      static: true,
    },
    check: {
      question: 'Why use experiment tracking?',
      options: ['To train faster', 'To record and compare every run so results are reproducible', 'To avoid writing code', 'To deploy automatically'],
      answer: 1,
      explanation: 'It captures the inputs, outputs and artifacts of each run so you can reproduce and compare them.',
    },
  },

  [`${A}/mlops/model-deployment`]: {
    answer: 'A common deployment stack wraps the model in a FastAPI HTTP endpoint with validation and health checks, packages it with Docker so it runs identically anywhere, and scales it with Kubernetes. A production API offers /predict plus /health and /ready probes and a model version.',
    points: [
      'FastAPI validates requests and serves predictions over HTTP.',
      'Docker makes the environment reproducible.',
      'Health and readiness probes let orchestrators manage the service.',
    ],
    example: {
      label: 'A prediction endpoint (FastAPI)',
      lang: 'python',
      code: `from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI()

class Order(BaseModel):
    distance: float
    items: int

@app.post("/predict")
def predict(order: Order):
    minutes = 5 * order.distance + 2 * order.items + 10
    return {"minutes": minutes, "model_version": "1.3.0"}

@app.get("/health")
def health():
    return {"status": "ok"}`,
      static: true,
    },
    check: {
      question: 'What does packaging a model in Docker provide?',
      options: ['Faster training', 'A reproducible environment that runs the same everywhere', 'A free GPU', 'Automatic labels'],
      answer: 1,
      explanation: 'The container bundles code and dependencies so it behaves identically in dev and production.',
    },
  },

  [`${A}/mlops/model-monitoring`]: {
    answer: 'Models degrade silently as the world shifts. Data drift is when input distributions change (detectable without labels using tests like KS or PSI); concept drift is when the input-output relationship changes (needs labels). Monitoring catches both and can trigger retraining before users complain.',
    points: [
      'Data drift is detectable immediately; concept drift needs outcomes.',
      'KS test and PSI flag shifts in feature distributions.',
      'Set thresholds that trigger alerts or retraining.',
    ],
    example: {
      label: 'Population Stability Index flags a feature shift',
      lang: 'python',
      code: `import math

train = [0.25, 0.25, 0.25, 0.25]      # expected proportions per bucket
live = [0.40, 0.30, 0.20, 0.10]       # recent proportions
psi = sum((l - t) * math.log(l / t) for t, l in zip(train, live))
print(f"PSI = {psi:.3f}",
      "-> significant drift" if psi > 0.2 else "-> stable")`,
    },
    check: {
      question: 'What is data drift?',
      options: ['The model file changing', 'Input feature distributions shifting over time', 'A slower server', 'A bug in training'],
      answer: 1,
      explanation: 'When live inputs no longer resemble the training data, predictions degrade; drift tests catch it.',
    },
  },

  [`${A}/mlops/retraining-pipelines`]: {
    answer: 'Safe retraining is a gated pipeline: train a challenger, pass an offline quality gate against the current champion, run it in shadow mode on live traffic, A/B test champion versus challenger, then promote gradually, with instant rollback if it underperforms. Gates stop a worse model reaching users.',
    points: [
      'A challenger must beat the champion on a fixed test set to proceed.',
      'Shadow mode scores live traffic without affecting users.',
      'Keep the previous model ready for instant rollback.',
    ],
    example: {
      label: 'The offline quality gate',
      lang: 'python',
      code: `champion_mae, challenger_mae = 8.0, 7.4
champion_r2, challenger_r2 = 0.82, 0.83

passes = challenger_mae <= champion_mae * 1.05 and challenger_r2 >= champion_r2
print("challenger MAE", challenger_mae, "R2", challenger_r2)
print("promote to shadow:", passes)`,
    },
    check: {
      question: 'What is shadow deployment?',
      options: ['Running the model in the dark', 'Scoring live traffic with the new model without affecting users', 'Deleting the old model', 'Training on test data'],
      answer: 1,
      explanation: 'Shadow mode compares the challenger on real traffic while users still get the champion\'s answers.',
    },
  },

  [`${A}/mlops/dvc-data-version-control`]: {
    answer: 'DVC versions datasets and models alongside code. It stores large files in remote storage (S3, GCS) and keeps tiny pointer files in Git, so git checkout plus dvc pull restores the exact data for any commit. It also defines reproducible pipelines in dvc.yaml.',
    points: [
      'Git tracks small .dvc pointers; the data lives in remote storage.',
      'A commit ties together code, data and model versions.',
      'dvc repro reruns only the stages whose inputs changed.',
    ],
    example: {
      label: 'Versioning data with DVC',
      lang: 'bash',
      code: `dvc add data/train.parquet      # creates data/train.parquet.dvc (a tiny pointer)
git add data/train.parquet.dvc data/.gitignore
git commit -m "Add training data v1"
dvc push                        # upload the real file to remote storage
# later: git checkout <commit> && dvc pull  restores the exact data`,
      static: true,
    },
    check: {
      question: 'What does DVC keep in Git?',
      options: ['The full datasets', 'Small pointer files that reference data in remote storage', 'Nothing', 'Only code'],
      answer: 1,
      explanation: 'Git holds lightweight .dvc pointers; the large files are stored and fetched separately.',
    },
  },

  [`${A}/mlops/ml-system-design`]: {
    answer: 'ML system design answers eight questions in order: frame the problem, data, features, model, serving, scale, monitoring and failure modes. Start with framing: the ML task type, the business metric (distinct from the ML metric), how labels are obtained, and the latency requirement.',
    points: [
      'Separate the business metric from the ML metric.',
      'Latency and scale shape the serving design.',
      'Plan monitoring and failure modes, not just the model.',
    ],
    example: {
      label: 'The framing questions for a delivery-time model',
      lang: 'text',
      code: `Task         regression (predict minutes)
ML metric    MAE        Business metric  on-time rate
Labels       actual delivery time, available after each order
Latency      < 100 ms at request time
Scale        50k predictions/minute at peak`,
      static: true,
    },
    check: {
      question: 'What should an ML system design start with?',
      options: ['Picking the model', 'Framing the problem, metrics, labels and latency', 'Buying GPUs', 'Writing the API'],
      answer: 1,
      explanation: 'Every later choice depends on the task, the metrics, how labels arrive, and the latency budget.',
    },
  },

  // ── Cloud ML ─────────────────────────────────────────────────────────────
  [`${A}/cloud-ml/azure-ml`]: {
    answer: 'Azure Machine Learning is a managed platform for the ML lifecycle: compute clusters that auto-scale to zero when idle, experiment tracking, a model registry, pipelines, AutoML and managed online endpoints. A workspace is the top-level container tying these resources together.',
    points: [
      'Compute clusters scale to zero, so idle time costs nothing.',
      'The registry versions models and promotes them to endpoints.',
      'AutoML searches models and hyperparameters for you.',
    ],
    example: {
      label: 'Core Azure ML resources',
      lang: 'text',
      code: `Workspace        top-level container (free)
Compute cluster  AmlCompute, auto-scales to 0 when idle
Environment      versioned dependencies (a conda/Docker spec)
Endpoint         managed online endpoint serving a registered model`,
      static: true,
    },
    check: {
      question: 'Why do Azure ML compute clusters scale to zero?',
      options: ['To delete data', 'So you pay nothing for compute while no jobs run', 'To train faster', 'To avoid the registry'],
      answer: 1,
      explanation: 'Auto-scaling to zero removes idle-cluster cost between jobs.',
    },
  },

  [`${A}/cloud-ml/aws-sagemaker`]: {
    answer: 'Amazon SageMaker is AWS\'s managed ML platform. Training jobs provision compute on demand, bill per second and terminate automatically; SageMaker Pipelines orchestrate steps; the Feature Store serves features; Clarify checks bias; and JumpStart offers prebuilt models. Your training script stays mostly unchanged.',
    points: [
      'Training jobs are ephemeral: pay per second, auto-terminate.',
      'Data paths and output are injected via SM_CHANNEL_* and SM_MODEL_DIR.',
      'Pipelines, Feature Store and endpoints cover the lifecycle.',
    ],
    example: {
      label: 'A SageMaker training job',
      lang: 'python',
      code: `from sagemaker.sklearn import SKLearn

estimator = SKLearn(entry_point="train.py", role=role,
                    instance_type="ml.m5.xlarge", framework_version="1.2")
estimator.fit({"train": "s3://acme-ml/train/"})   # provisions, trains, uploads model, terminates`,
      static: true,
    },
    check: {
      question: 'What is true of a SageMaker training job\'s compute?',
      options: ['It runs forever', 'It provisions on demand and terminates automatically when done', 'It must be pre-reserved', 'It is always a GPU'],
      answer: 1,
      explanation: 'Training jobs spin up, run, upload the model and shut down, billing per second.',
    },
  },

  [`${A}/cloud-ml/gcp-vertex-ai`]: {
    answer: 'Vertex AI is GCP\'s unified ML platform, with training, pipelines, a feature store, a model registry and online prediction endpoints. Its standout is native BigQuery integration, so you can train directly on warehouse data. Resources follow the path projects/{project}/locations/{region}/{type}/{id}.',
    points: [
      'Tight BigQuery integration suits warehouse-centric teams.',
      'Vertex Pipelines orchestrate the workflow.',
      'Managed endpoints serve online predictions.',
    ],
    example: {
      label: 'Vertex AI\'s differentiators',
      lang: 'text',
      code: `Native BigQuery  train on warehouse tables without exporting
Pipelines        Kubeflow-based orchestration
Feature Store    online + offline features
Model Registry   versioning + managed online endpoints`,
      static: true,
    },
    check: {
      question: 'What is Vertex AI\'s main differentiator among cloud ML platforms?',
      options: ['Lowest price', 'Native BigQuery integration for training on warehouse data', 'No need for models', 'Only AutoML'],
      answer: 1,
      explanation: 'Training directly on BigQuery data is a natural fit for GCP data teams.',
    },
  },

  [`${A}/cloud-ml/mlops-on-cloud`]: {
    answer: 'ML CI/CD has two triggers: code changes (run tests on every pull request, block merge on failure) and data or schedule changes (retrain weekly or on drift). A gated pipeline runs unit and smoke tests, then cloud training with a champion comparison, then staged deployment, failing fast and cheaply.',
    points: [
      'Code changes run fast local tests; data changes trigger retraining.',
      'Gate promotion on the challenger beating the champion within tolerance.',
      'Deploy to staging before production.',
    ],
    example: {
      label: 'A GitHub Actions trigger for ML CI',
      lang: 'yaml',
      code: `on:
  pull_request:          # code change
  schedule:
    - cron: "0 3 * * 1"  # weekly retraining
jobs:
  test:
    steps:
      - run: pytest tests/            # unit + smoke test on a small sample
      - run: python validate_model.py # block if challenger is worse`,
      static: true,
    },
    check: {
      question: 'What are the two triggers for ML CI/CD?',
      options: ['Morning and evening', 'Code changes and data/schedule changes', 'Train and test', 'CPU and GPU'],
      answer: 1,
      explanation: 'A pull request runs tests; a schedule or drift triggers retraining.',
    },
  },

  // ── Interview prep ───────────────────────────────────────────────────────
  [`${A}/ml-interview-prep`]: {
    answer: 'ML interviews reward clear explanations at two levels: plain-English intuition for non-ML interviewers and technical depth for ML ones. They cover the full stack, and the most underprepared area is MLOps and production, which senior interviewers weigh heavily.',
    points: [
      'Prepare both an intuitive and a technical answer for each topic.',
      'Do not neglect production and MLOps questions.',
      'Explain trade-offs, not just definitions.',
    ],
    example: {
      label: 'Two levels for "what is overfitting?"',
      lang: 'text',
      code: `Plain:     the model memorised the training data instead of the pattern,
           so it aces practice but fails on new examples.
Technical: low bias, high variance — a large train/validation gap;
           fix with regularisation, more data, or a simpler model.`,
      static: true,
    },
    check: {
      question: 'Which area do ML candidates most often underprepare?',
      options: ['Linear algebra', 'MLOps and production', 'Python syntax', 'Note-taking'],
      answer: 1,
      explanation: 'Many prepare only model theory; senior interviews probe serving, monitoring and reliability.',
    },
  },
}
