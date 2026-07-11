// ─────────────────────────────────────────────────────────────────────────────
// StreamPulse Dataset — Data Science Track
// A fictional video streaming service used across every Data Science module.
// Loaded into pandas DataFrames inside the live in-browser Python playground
// (Pyodide). Currency: INR for prices, dates run 2021–2026.
// ─────────────────────────────────────────────────────────────────────────────

export const CSV_USERS = `user_id,first_name,last_name,email,country,age,gender,signup_date,plan,referral_source
1,Aditi,Sharma,aditi.sharma@mailbox.com,Australia,40,Non-binary,2024-10-20,Standard,Organic Search
2,Rohan,Verma,rohan.verma@mailbox.com,India,26,Female,2025-09-19,Standard,Social Media
3,Meera,Iyer,meera.iyer@mailbox.com,India,58,Non-binary,2025-06-08,Premium,Organic Search
4,Kabir,Kapoor,kabir.kapoor@mailbox.com,Singapore,61,Non-binary,2021-05-19,Basic,Social Media
5,Ananya,Reddy,ananya.reddy@mailbox.com,Australia,52,Female,2023-01-17,Standard,App Store
6,Vikram,Nair,vikram.nair@mailbox.com,Germany,56,Non-binary,2022-11-12,Premium,Organic Search
7,Priya,Gupta,priya.gupta@mailbox.com,Singapore,29,Female,2023-01-05,Premium,Social Media
8,Arjun,Menon,arjun.menon@mailbox.com,UK,44,Non-binary,2023-10-18,Standard,Organic Search
9,Sneha,Chopra,sneha.chopra@mailbox.com,UK,19,Non-binary,2025-03-23,Basic,Friend Referral
10,Rahul,Rao,rahul.rao@mailbox.com,India,17,Female,2022-07-28,Standard,Social Media
11,Isha,Malhotra,isha.malhotra@mailbox.com,UK,45,Male,2021-10-13,Premium,Organic Search
12,Karan,Bose,karan.bose@mailbox.com,Germany,40,Non-binary,2024-06-12,Basic,Organic Search
13,Divya,Pillai,divya.pillai@mailbox.com,UK,41,Female,2025-10-17,Basic,Paid Ad
14,Nikhil,Joshi,nikhil.joshi@mailbox.com,Australia,43,Female,2021-10-19,Standard,App Store
15,Pooja,Desai,pooja.desai@mailbox.com,Germany,56,Male,2021-06-02,Premium,Social Media
16,Sameer,Khanna,sameer.khanna@mailbox.com,Germany,39,Female,2021-07-13,Premium,Organic Search
17,Tanya,Bhatt,tanya.bhatt@mailbox.com,UAE,59,Male,2024-07-13,Standard,Social Media
18,Aryan,Agarwal,aryan.agarwal@mailbox.com,USA,20,Female,2025-08-07,Premium,Social Media
19,Neha,Shetty,neha.shetty@mailbox.com,Germany,57,Female,2021-07-22,Standard,Social Media
20,Varun,Bansal,varun.bansal@mailbox.com,Singapore,60,Female,2021-03-06,Standard,Social Media
21,Riya,Mehta,riya.mehta@mailbox.com,Singapore,28,Female,2021-05-02,Premium,Organic Search
22,Amit,Kaur,amit.kaur@mailbox.com,Singapore,19,Non-binary,2021-10-09,Standard,Friend Referral
23,Kavya,Chatterjee,kavya.chatterjee@mailbox.com,Canada,48,Non-binary,2024-05-09,Standard,App Store
24,Dev,Naidu,dev.naidu@mailbox.com,UAE,34,Female,2021-11-16,Standard,Paid Ad
25,Simran,Sinha,simran.sinha@mailbox.com,Singapore,55,Non-binary,2021-05-12,Basic,Friend Referral`;

export const CSV_TITLES = `title_id,title_name,type,genre,release_year,runtime_minutes,imdb_rating,language,is_original
1,Crimson Tide Rising,Series,Drama,2023,46,7.9,English,True
2,The Last Monsoon,Movie,Drama,2022,154,8.1,Hindi,False
3,Neon Alley,Series,Sci-Fi,2024,46,5.8,English,False
4,Spice Route,Series,Documentary,2021,50,7.7,English,True
5,Midnight in Mumbai,Movie,Thriller,2023,116,6.3,Hindi,False
6,Quantum Heist,Movie,Action,2024,106,5.8,English,False
7,The Chai Stall,Series,Comedy,2022,33,8.2,Hindi,True
8,Coral Reef Chronicles,Series,Documentary,2023,30,6.3,English,False
9,Silent Bazaar,Movie,Mystery,2021,143,6.2,Hindi,False
10,Skyline Circuit,Series,Action,2024,32,5.8,English,True
11,Paper Boats,Movie,Romance,2020,105,8.7,Hindi,False
12,The Algorithm,Series,Sci-Fi,2023,48,7.0,English,False
13,Monsoon Wedding Diaries,Series,Romance,2022,38,8.2,Hindi,True
14,Desert Falcon,Movie,Adventure,2021,122,7.9,English,False
15,Byte Sized,Series,Comedy,2024,51,8.1,English,False
16,The Ministry of Time,Series,Fantasy,2023,39,5.8,English,True
17,Kolkata Nights,Movie,Crime,2022,98,5.9,Bengali,False
18,Orbit Zero,Movie,Sci-Fi,2024,120,7.6,English,False
19,Street Food Kings,Series,Documentary,2021,32,8.4,English,True
20,The Last Wicket,Movie,Sports,2023,143,7.1,Hindi,False`;

export const CSV_SUBSCRIPTIONS = `subscription_id,user_id,plan,start_date,end_date,monthly_price,status,cancel_reason
1,1,Standard,2024-10-20,2024-12-08,399,cancelled,Switched to competitor
2,2,Standard,2025-09-19,,399,active,
3,3,Premium,2025-06-08,,649,active,
4,4,Basic,2021-05-19,,199,active,
5,5,Standard,2023-01-17,,399,active,
6,6,Premium,2022-11-12,2022-12-05,649,cancelled,Technical issues
7,7,Premium,2023-01-05,,649,active,
8,8,Standard,2023-10-18,,399,active,
9,9,Basic,2025-03-23,,199,active,
10,10,Standard,2022-07-28,,399,active,
11,11,Premium,2021-10-13,2021-12-13,649,cancelled,No longer needed
12,12,Basic,2024-06-12,,199,active,
13,13,Basic,2025-10-17,,199,active,
14,14,Standard,2021-10-19,,399,active,
15,15,Premium,2021-06-02,,649,active,
16,16,Premium,2021-07-13,2021-09-20,649,cancelled,Too expensive
17,17,Standard,2024-07-13,,399,active,
18,18,Premium,2025-08-07,,649,active,
19,19,Standard,2021-07-22,,399,active,
20,20,Standard,2021-03-06,,399,active,
21,21,Premium,2021-05-02,2021-12-15,649,cancelled,Technical issues
22,22,Standard,2021-10-09,,399,active,
23,23,Standard,2024-05-09,,399,active,
24,24,Standard,2021-11-16,,399,active,
25,25,Basic,2021-05-12,,199,active,`;

export const CSV_WATCH_HISTORY = `watch_id,user_id,title_id,watch_date,minutes_watched,device,completed
1,8,12,2026-07-02,9,Laptop,False
2,8,7,2024-05-05,11,Laptop,False
3,11,5,2025-04-03,81,Laptop,False
4,21,2,2026-07-21,110,TV,False
5,3,19,2025-07-08,23,TV,False
6,24,17,2025-01-18,96,Mobile,True
7,4,13,2024-07-08,27,Laptop,False
8,17,12,2024-02-18,31,Laptop,False
9,19,15,2026-07-04,49,Mobile,True
10,25,3,2026-03-08,7,TV,False
11,14,19,2024-03-09,16,TV,False
12,2,9,2024-06-22,132,Mobile,True
13,8,6,2024-06-06,38,Tablet,False
14,7,8,2026-05-11,19,Tablet,False
15,7,14,2024-06-17,19,Tablet,False
16,3,4,2026-07-03,50,TV,True
17,17,13,2025-03-13,9,Tablet,False
18,21,1,2025-03-06,36,TV,False
19,16,16,2026-05-26,39,TV,True
20,23,4,2024-03-10,24,Mobile,False
21,20,10,2026-07-23,29,Mobile,True
22,9,20,2026-03-25,78,TV,False
23,11,1,2025-06-12,33,Tablet,False
24,22,3,2025-05-25,18,Mobile,False
25,24,20,2026-05-03,65,TV,False
26,23,19,2026-05-10,11,TV,False
27,3,12,2026-07-12,9,Tablet,False
28,20,7,2026-06-16,16,Laptop,False
29,5,4,2026-03-13,19,Tablet,False
30,24,14,2025-04-15,107,TV,False
31,6,10,2024-04-13,8,Mobile,False
32,9,6,2024-01-06,92,Mobile,False
33,6,19,2025-06-13,25,Tablet,False
34,7,19,2026-06-16,22,Laptop,False
35,23,16,2026-06-08,11,TV,False
36,5,19,2026-02-16,4,TV,False
37,5,14,2026-06-20,22,Mobile,False
38,2,19,2026-03-27,29,Laptop,True
39,9,19,2024-07-22,26,Tablet,False
40,14,10,2025-05-19,25,Tablet,False
41,20,16,2026-06-06,27,TV,False
42,25,12,2026-01-10,46,TV,True
43,17,1,2024-06-12,45,Laptop,True
44,6,9,2024-04-22,38,TV,False
45,6,3,2026-05-18,42,Laptop,True
46,23,3,2024-05-22,36,Laptop,False
47,13,12,2025-06-10,33,Laptop,False
48,11,8,2024-06-14,11,Mobile,False
49,12,2,2025-01-05,117,Tablet,False
50,12,19,2024-06-16,12,TV,False
51,20,7,2025-07-12,19,Laptop,False
52,15,15,2025-02-05,51,Mobile,True
53,18,10,2026-05-02,14,Mobile,False
54,14,11,2026-04-08,62,Mobile,False
55,17,16,2024-06-07,33,Tablet,False
56,8,6,2026-07-03,18,Laptop,False
57,1,2,2025-01-01,96,TV,False
58,3,10,2026-06-14,28,Tablet,False
59,12,6,2026-04-04,105,Mobile,True
60,4,2,2025-04-07,134,TV,False
61,14,18,2026-07-04,91,TV,False
62,11,1,2026-04-26,37,TV,False
63,15,9,2026-04-03,69,Mobile,False
64,23,20,2025-07-14,128,Mobile,False
65,9,20,2024-03-04,115,TV,False
66,16,15,2024-06-25,14,Mobile,False
67,3,9,2025-04-22,60,Tablet,False
68,2,5,2024-04-11,78,Mobile,False
69,12,1,2024-03-22,19,Tablet,False
70,13,15,2024-01-23,16,TV,False
71,9,1,2024-04-28,8,Mobile,False
72,3,18,2026-06-12,89,Tablet,False
73,4,16,2026-02-25,6,Laptop,False
74,21,19,2024-06-22,15,Tablet,False
75,24,13,2025-05-12,26,Laptop,False
76,21,6,2024-06-09,31,Mobile,False
77,14,18,2026-04-06,19,TV,False
78,21,2,2026-01-06,109,TV,False
79,1,8,2026-01-21,6,TV,False
80,24,16,2025-07-14,6,TV,False
81,20,16,2026-05-27,38,Mobile,True
82,20,7,2026-07-11,12,Mobile,False
83,20,13,2026-01-12,10,TV,False
84,23,19,2026-07-16,21,Mobile,False
85,23,19,2026-04-27,28,Laptop,False
86,25,16,2024-06-15,8,TV,False
87,23,14,2026-03-07,47,Tablet,False
88,16,4,2026-02-02,20,Mobile,False
89,7,8,2024-01-08,19,Tablet,False
90,1,3,2024-01-15,17,TV,False
91,6,6,2026-04-11,27,Mobile,False
92,6,4,2024-04-05,48,Mobile,True
93,16,2,2024-02-09,66,Mobile,False
94,17,13,2024-03-25,23,Mobile,False
95,11,1,2025-01-24,46,TV,True
96,19,2,2026-07-03,93,Mobile,False
97,13,17,2024-01-22,91,Tablet,True
98,8,4,2024-02-06,11,Tablet,False
99,13,4,2026-03-28,13,Tablet,False
100,15,19,2024-03-24,9,Tablet,False`;

export const CSV_RATINGS = `rating_id,user_id,title_id,rating,rating_date,review_text
1,20,6,5,2025-06-15,Absolutely loved the pacing and the cast.
2,20,1,3,2024-04-02,Absolutely loved the pacing and the cast.
3,2,6,2,2025-06-13,
4,15,7,2,2025-04-15,One of the best things StreamPulse has produced.
5,13,20,1,2025-02-17,
6,2,15,5,2024-03-16,Absolutely loved the pacing and the cast.
7,6,8,5,2025-07-21,
8,1,3,1,2024-05-03,"Great cinematography, average story."
9,25,2,4,2026-05-17,
10,16,7,2,2025-01-15,Absolutely loved the pacing and the cast.
11,5,4,3,2025-01-24,
12,25,10,5,2025-06-28,
13,11,2,3,2026-02-18,
14,10,16,2,2024-06-13,One of the best things StreamPulse has produced.
15,11,16,1,2025-03-16,
16,24,12,4,2025-02-26,Started strong but the ending felt rushed.
17,21,3,2,2025-05-19,Absolutely loved the pacing and the cast.
18,9,15,4,2024-06-23,"Could not stop watching, binged it in a weekend."
19,12,14,2,2025-01-09,
20,21,16,1,2025-01-11,
21,6,16,4,2024-04-18,Started strong but the ending felt rushed.
22,4,5,3,2025-04-01,
23,18,6,5,2026-02-09,"Could not stop watching, binged it in a weekend."
24,9,19,2,2024-02-19,Absolutely loved the pacing and the cast.
25,9,8,5,2026-05-02,
26,25,4,5,2025-06-28,
27,16,5,1,2024-04-11,Absolutely loved the pacing and the cast.
28,2,14,1,2024-02-27,One of the best things StreamPulse has produced.
29,13,14,5,2025-03-27,
30,22,4,5,2026-01-07,
31,17,3,5,2025-02-18,Started strong but the ending felt rushed.
32,15,18,5,2026-05-24,Absolutely loved the pacing and the cast.
33,9,4,3,2026-07-01,Absolutely loved the pacing and the cast.
34,13,11,1,2025-06-13,
35,1,16,2,2026-06-08,
36,2,3,2,2024-04-11,Started strong but the ending felt rushed.
37,12,20,1,2026-04-22,
38,14,3,2,2025-06-06,
39,7,1,2,2026-01-27,One of the best things StreamPulse has produced.
40,3,8,5,2024-01-17,`;

// ─── Bundle for the playground bootstrap ───────────────────────────────────
export const STREAMPULSE_CSV: Record<string, string> = {
  users: CSV_USERS,
  titles: CSV_TITLES,
  subscriptions: CSV_SUBSCRIPTIONS,
  watch_history: CSV_WATCH_HISTORY,
  ratings: CSV_RATINGS,
};

// ─── Schema metadata — for the "Schema" sidebar in the playground ──────────
export interface DSColumn { name: string; dtype: string }
export interface DSTable { name: string; color: string; rowCount: number; columns: DSColumn[] }

export const DS_TABLES: DSTable[] = [
  {
    name: 'users', color: '#8b5cf6', rowCount: 25,
    columns: [
      { name: 'user_id', dtype: 'int64' }, { name: 'first_name', dtype: 'object' },
      { name: 'last_name', dtype: 'object' }, { name: 'email', dtype: 'object' },
      { name: 'country', dtype: 'object' }, { name: 'age', dtype: 'int64' },
      { name: 'gender', dtype: 'object' }, { name: 'signup_date', dtype: 'datetime64' },
      { name: 'plan', dtype: 'object' }, { name: 'referral_source', dtype: 'object' },
    ],
  },
  {
    name: 'titles', color: '#06b6d4', rowCount: 20,
    columns: [
      { name: 'title_id', dtype: 'int64' }, { name: 'title_name', dtype: 'object' },
      { name: 'type', dtype: 'object' }, { name: 'genre', dtype: 'object' },
      { name: 'release_year', dtype: 'int64' }, { name: 'runtime_minutes', dtype: 'int64' },
      { name: 'imdb_rating', dtype: 'float64' }, { name: 'language', dtype: 'object' },
      { name: 'is_original', dtype: 'bool' },
    ],
  },
  {
    name: 'subscriptions', color: '#f97316', rowCount: 25,
    columns: [
      { name: 'subscription_id', dtype: 'int64' }, { name: 'user_id', dtype: 'int64' },
      { name: 'plan', dtype: 'object' }, { name: 'start_date', dtype: 'datetime64' },
      { name: 'end_date', dtype: 'datetime64' }, { name: 'monthly_price', dtype: 'int64' },
      { name: 'status', dtype: 'object' }, { name: 'cancel_reason', dtype: 'object' },
    ],
  },
  {
    name: 'watch_history', color: '#10b981', rowCount: 100,
    columns: [
      { name: 'watch_id', dtype: 'int64' }, { name: 'user_id', dtype: 'int64' },
      { name: 'title_id', dtype: 'int64' }, { name: 'watch_date', dtype: 'datetime64' },
      { name: 'minutes_watched', dtype: 'int64' }, { name: 'device', dtype: 'object' },
      { name: 'completed', dtype: 'bool' },
    ],
  },
  {
    name: 'ratings', color: '#ec4899', rowCount: 40,
    columns: [
      { name: 'rating_id', dtype: 'int64' }, { name: 'user_id', dtype: 'int64' },
      { name: 'title_id', dtype: 'int64' }, { name: 'rating', dtype: 'int64' },
      { name: 'rating_date', dtype: 'datetime64' }, { name: 'review_text', dtype: 'object' },
    ],
  },
];

// ─── Curriculum ─────────────────────────────────────────────────────────────
export interface DSModule {
  id: number
  slug: string
  title: string
  description: string
  tags: string[]
  status: 'live' | 'coming-soon'
  readTime: string
}

export interface DSSection {
  id: number
  title: string
  color: string
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced'
  modules: DSModule[]
}

export const DS_CURRICULUM: DSSection[] = [
  {
    id: 1, title: 'Data Science Foundations', color: '#8b5cf6', difficulty: 'Beginner',
    modules: [
      { id: 1, slug: 'what-is-data-science', title: 'What is Data Science?', description: 'The definition that actually explains it, the DS lifecycle, and why every streaming, ride-hailing, and fintech app runs on this discipline', tags: ['Data Science definition', 'DS lifecycle', 'Why it matters', 'StreamPulse intro'], status: 'live', readTime: '10–14 min' },
      { id: 2, slug: 'data-science-workflow', title: 'The Data Science Workflow', description: 'From a vague business question to a shipped decision — the six stages every real project moves through', tags: ['Problem framing', 'Data collection', 'EDA', 'Modeling', 'Communication'], status: 'coming-soon', readTime: '12–16 min' },
      { id: 3, slug: 'ds-vs-other-roles', title: 'Data Science vs Data Engineering vs ML Engineering vs Analytics', description: 'Four job titles that get confused constantly — what each one actually owns day to day', tags: ['DS vs DE', 'DS vs ML Eng', 'DS vs Analyst', 'Career paths'], status: 'coming-soon', readTime: '10–14 min' },
      { id: 4, slug: 'python-environment-setup', title: 'Setting Up — Your Browser-Based Python Environment', description: 'Meet the live Python + pandas playground running entirely in your browser, and the StreamPulse dataset you will use for every module', tags: ['Pyodide', 'Jupyter alternative', 'pandas', 'StreamPulse dataset'], status: 'coming-soon', readTime: '8–12 min' },
    ],
  },
  {
    id: 2, title: 'Python Foundations for Data Science', color: '#3b82f6', difficulty: 'Beginner',
    modules: [
      { id: 5, slug: 'python-basics-variables-types', title: 'Variables and Data Types', description: 'Numbers, strings, booleans, and None — the building blocks of every line of analysis code', tags: ['Variables', 'int/float/str', 'Booleans', 'Type checking'], status: 'coming-soon', readTime: '10–14 min' },
      { id: 6, slug: 'lists-dicts-tuples', title: 'Lists, Dictionaries, and Tuples', description: 'The containers that hold real datasets before they ever reach a DataFrame', tags: ['Lists', 'Dictionaries', 'Tuples', 'Indexing'], status: 'coming-soon', readTime: '12–16 min' },
      { id: 7, slug: 'control-flow-loops', title: 'Control Flow — if/else and Loops', description: 'Decisions and repetition — the logic every data cleaning script depends on', tags: ['if/elif/else', 'for loops', 'while loops', 'break/continue'], status: 'coming-soon', readTime: '10–14 min' },
      { id: 8, slug: 'functions-and-comprehensions', title: 'Functions and List Comprehensions', description: 'Write reusable logic once, and the one-line pattern every data scientist uses instead of loops', tags: ['def functions', 'Arguments', 'List comprehensions', 'Lambda'], status: 'coming-soon', readTime: '12–16 min' },
      { id: 9, slug: 'working-with-files-and-json', title: 'Working with Files, CSV, and JSON', description: 'Reading and writing the two formats that carry almost all real-world data', tags: ['File I/O', 'CSV', 'JSON', 'Encoding'], status: 'coming-soon', readTime: '10–14 min' },
    ],
  },
  {
    id: 3, title: 'NumPy — Numerical Computing', color: '#f97316', difficulty: 'Beginner',
    modules: [
      { id: 10, slug: 'numpy-arrays-basics', title: 'NumPy Arrays — The Foundation of Everything', description: 'Why every numeric library in Python is built on top of the ndarray', tags: ['ndarray', 'Creating arrays', 'Shape & dtype', 'Why not lists'], status: 'coming-soon', readTime: '12–16 min' },
      { id: 11, slug: 'array-indexing-slicing', title: 'Indexing, Slicing, and Boolean Masks', description: 'Select exactly the elements you need — the pattern that also powers pandas filtering', tags: ['Indexing', 'Slicing', 'Boolean masks', 'Fancy indexing'], status: 'coming-soon', readTime: '12–16 min' },
      { id: 12, slug: 'vectorization-and-broadcasting', title: 'Vectorization and Broadcasting', description: 'Why NumPy is 100x faster than a Python loop, and the broadcasting rules that make it work', tags: ['Vectorization', 'Broadcasting rules', 'Performance', 'Element-wise ops'], status: 'coming-soon', readTime: '14–18 min' },
      { id: 13, slug: 'numpy-aggregations-and-stats', title: 'Aggregations and Basic Statistics', description: 'mean, std, sum, min, max, and the axis parameter that trips up every beginner', tags: ['mean/std/sum', 'axis parameter', 'argmin/argmax', 'Cumulative functions'], status: 'coming-soon', readTime: '12–16 min' },
    ],
  },
  {
    id: 4, title: 'Pandas Fundamentals', color: '#10b981', difficulty: 'Beginner',
    modules: [
      { id: 14, slug: 'series-and-dataframes', title: 'Series and DataFrames', description: 'The two core pandas objects — and how the StreamPulse tables become live DataFrames the moment this page loads', tags: ['Series', 'DataFrame', 'Index', 'dtypes'], status: 'coming-soon', readTime: '12–16 min' },
      { id: 15, slug: 'reading-and-inspecting-data', title: 'Reading and Inspecting Data', description: 'head, tail, info, describe, shape — the five commands you run on any dataset in the first ten seconds', tags: ['read_csv', '.head()/.info()', '.describe()', 'First look at data'], status: 'coming-soon', readTime: '10–14 min' },
      { id: 16, slug: 'selecting-and-filtering-rows', title: 'Selecting and Filtering Rows', description: 'loc, iloc, and boolean filtering — getting exactly the rows you need out of any DataFrame', tags: ['.loc/.iloc', 'Boolean filtering', 'Multiple conditions', 'query()'], status: 'coming-soon', readTime: '14–18 min' },
      { id: 17, slug: 'sorting-and-ranking', title: 'Sorting and Ranking', description: 'sort_values, sort_index, rank — controlling the order your analysis surfaces results in', tags: ['sort_values', 'sort_index', 'rank()', 'nlargest/nsmallest'], status: 'coming-soon', readTime: '8–12 min' },
      { id: 18, slug: 'adding-and-modifying-columns', title: 'Adding and Modifying Columns', description: 'Derived columns, renaming, dropping — shaping a DataFrame into the form your analysis needs', tags: ['Column assignment', 'rename()', 'drop()', 'assign()'], status: 'coming-soon', readTime: '10–14 min' },
    ],
  },
  {
    id: 5, title: 'Data Cleaning', color: '#ef4444', difficulty: 'Intermediate',
    modules: [
      { id: 19, slug: 'handling-missing-values', title: 'Handling Missing Values', description: 'isna, dropna, fillna — the decision tree every data scientist runs before any analysis', tags: ['NaN', 'isna()/notna()', 'dropna()', 'fillna()'], status: 'coming-soon', readTime: '14–18 min' },
      { id: 20, slug: 'duplicates-and-data-types', title: 'Duplicates and Data Type Conversion', description: 'Finding and removing duplicate rows, and casting columns to the type they should have been all along', tags: ['duplicated()', 'drop_duplicates()', 'astype()', 'to_datetime()'], status: 'coming-soon', readTime: '12–16 min' },
      { id: 21, slug: 'string-cleaning-and-regex', title: 'String Cleaning and Regular Expressions', description: 'Whitespace, casing, and pattern extraction — the .str accessor and regex basics for messy text columns', tags: ['.str accessor', 'strip/lower/replace', 'Regex basics', 'extract()'], status: 'coming-soon', readTime: '14–20 min' },
      { id: 22, slug: 'outlier-detection', title: 'Outlier Detection', description: 'IQR, z-scores, and visual methods for finding the data points that will break your model', tags: ['IQR method', 'Z-score', 'Boxplots', 'When to remove vs keep'], status: 'coming-soon', readTime: '14–18 min' },
      { id: 23, slug: 'data-validation-checks', title: 'Data Validation Checks', description: 'Building a checklist that catches bad data before it reaches a stakeholder or a model', tags: ['Schema checks', 'Range checks', 'Referential checks', 'Assertions'], status: 'coming-soon', readTime: '10–14 min' },
    ],
  },
  {
    id: 6, title: 'Data Wrangling', color: '#a855f7', difficulty: 'Intermediate',
    modules: [
      { id: 24, slug: 'groupby-fundamentals', title: 'GroupBy Fundamentals', description: 'The single most powerful pandas operation — split, apply, combine, explained visually', tags: ['groupby()', 'Split-apply-combine', 'agg()', 'Single-column grouping'], status: 'coming-soon', readTime: '16–22 min' },
      { id: 25, slug: 'multi-column-groupby-and-agg', title: 'Multi-Column GroupBy and Aggregation', description: 'Grouping by more than one column and applying different aggregations to different columns at once', tags: ['Multi-key groupby', 'Named aggregation', 'transform()', 'filter()'], status: 'coming-soon', readTime: '14–18 min' },
      { id: 26, slug: 'merging-and-joining-dataframes', title: 'Merging and Joining DataFrames', description: 'Combining users, watch_history, and titles into one analysis-ready table — inner, left, right, outer', tags: ['merge()', 'Inner/left/right/outer', 'join()', 'Merge keys'], status: 'coming-soon', readTime: '16–22 min' },
      { id: 27, slug: 'concatenating-and-reshaping', title: 'Concatenating and Reshaping', description: 'Stacking DataFrames together and reshaping between wide and long formats', tags: ['concat()', 'Wide vs long', 'stack/unstack', 'Axis parameter'], status: 'coming-soon', readTime: '12–16 min' },
      { id: 28, slug: 'pivot-tables-and-melt', title: 'Pivot Tables and melt()', description: 'Excel-style pivot tables in pandas, and the reverse operation that tidies messy spreadsheets', tags: ['pivot_table()', 'melt()', 'Tidy data', 'Cross-tabulation'], status: 'coming-soon', readTime: '14–18 min' },
      { id: 29, slug: 'apply-map-and-lambda', title: 'apply, map, and Lambda Functions', description: 'Running custom logic across rows and columns when built-in pandas methods are not enough', tags: ['apply()', 'map()', 'applymap()', 'Lambda functions'], status: 'coming-soon', readTime: '12–16 min' },
    ],
  },
  {
    id: 7, title: 'Exploratory Data Analysis', color: '#06b6d4', difficulty: 'Intermediate',
    modules: [
      { id: 30, slug: 'descriptive-statistics', title: 'Descriptive Statistics', description: 'Mean, median, mode, variance, standard deviation — and which one lies to you when data is skewed', tags: ['Mean/median/mode', 'Variance & std dev', 'Skewness', 'describe()'], status: 'coming-soon', readTime: '14–18 min' },
      { id: 31, slug: 'distributions-and-histograms', title: 'Distributions and Histograms', description: 'Seeing the shape of your data before you trust any summary statistic about it', tags: ['Histograms', 'Bins', 'Skew & kurtosis', 'Normal vs skewed'], status: 'coming-soon', readTime: '12–16 min' },
      { id: 32, slug: 'correlation-analysis', title: 'Correlation Analysis', description: 'Pearson correlation, correlation matrices, and why correlation is not causation — with a StreamPulse example', tags: ['corr()', 'Correlation matrix', 'Heatmaps', 'Correlation vs causation'], status: 'coming-soon', readTime: '14–18 min' },
      { id: 33, slug: 'eda-workflow-case-study', title: 'A Complete EDA Workflow — Case Study', description: 'Start to finish: exploring StreamPulse watch_history to find what actually drives engagement', tags: ['EDA checklist', 'Case study', 'Hypothesis generation', 'Engagement analysis'], status: 'coming-soon', readTime: '18–24 min' },
      { id: 34, slug: 'storytelling-with-data', title: 'Storytelling with Data', description: 'Turning a notebook full of charts into a narrative a non-technical stakeholder will act on', tags: ['Data storytelling', 'Structuring an analysis', 'Slide-ready charts', 'Avoiding chart junk'], status: 'coming-soon', readTime: '12–16 min' },
    ],
  },
  {
    id: 8, title: 'Data Visualization', color: '#ec4899', difficulty: 'Intermediate',
    modules: [
      { id: 35, slug: 'matplotlib-fundamentals', title: 'Matplotlib Fundamentals', description: 'Figures, axes, and the object-oriented API that every other Python plotting library builds on', tags: ['Figure & Axes', 'plot()', 'Labels & titles', 'Subplots'], status: 'coming-soon', readTime: '14–18 min' },
      { id: 36, slug: 'seaborn-statistical-plots', title: 'Seaborn — Statistical Plots Made Simple', description: 'Boxplots, violin plots, pairplots, and heatmaps in one line instead of twenty', tags: ['Seaborn basics', 'Boxplot/violinplot', 'Pairplot', 'Heatmap'], status: 'coming-soon', readTime: '14–18 min' },
      { id: 37, slug: 'choosing-the-right-chart', title: 'Choosing the Right Chart', description: 'A decision framework for picking bar vs line vs scatter vs box — and the charts that mislead', tags: ['Chart selection', 'Bar vs line vs scatter', 'Misleading charts', 'Chart anatomy'], status: 'coming-soon', readTime: '10–14 min' },
      { id: 38, slug: 'building-a-dashboard-view', title: 'Building a Dashboard View', description: 'Combining multiple charts into one cohesive summary of StreamPulse subscriber health', tags: ['Subplots layout', 'KPI summary', 'Dashboard design', 'Annotations'], status: 'coming-soon', readTime: '14–20 min' },
    ],
  },
  {
    id: 9, title: 'Statistics and Probability', color: '#f59e0b', difficulty: 'Advanced',
    modules: [
      { id: 39, slug: 'probability-basics', title: 'Probability Basics', description: 'Events, sample spaces, conditional probability, and Bayes theorem — with StreamPulse churn examples', tags: ['Sample space', 'Conditional probability', 'Bayes theorem', 'Independence'], status: 'coming-soon', readTime: '16–22 min' },
      { id: 40, slug: 'common-distributions', title: 'Common Probability Distributions', description: 'Normal, binomial, and Poisson — the three distributions that explain most real-world data', tags: ['Normal distribution', 'Binomial distribution', 'Poisson distribution', 'PDF vs CDF'], status: 'coming-soon', readTime: '16–22 min' },
      { id: 41, slug: 'central-limit-theorem', title: 'The Central Limit Theorem', description: 'Why sample means are normally distributed even when the underlying data is not — and why this matters for every test that follows', tags: ['CLT', 'Sampling distribution', 'Standard error', 'Law of large numbers'], status: 'coming-soon', readTime: '14–18 min' },
      { id: 42, slug: 'hypothesis-testing', title: 'Hypothesis Testing', description: 'Null and alternative hypotheses, t-tests, p-values — and what a p-value actually does not mean', tags: ['Null/alternative hypothesis', 't-test', 'p-values', 'Type I & II errors'], status: 'coming-soon', readTime: '18–24 min' },
      { id: 43, slug: 'confidence-intervals', title: 'Confidence Intervals', description: 'Quantifying uncertainty around an estimate — and why "95% confident" does not mean what most people think', tags: ['Confidence intervals', 'Margin of error', 'Interpretation', 'Sample size effects'], status: 'coming-soon', readTime: '14–18 min' },
      { id: 44, slug: 'ab-testing-fundamentals', title: 'A/B Testing Fundamentals', description: 'Designing a valid experiment to test a new StreamPulse recommendation algorithm end to end', tags: ['A/B test design', 'Control vs treatment', 'Statistical significance', 'Common pitfalls'], status: 'coming-soon', readTime: '18–24 min' },
    ],
  },
  {
    id: 10, title: 'Intro to Predictive Modeling', color: '#22c55e', difficulty: 'Advanced',
    modules: [
      { id: 45, slug: 'train-test-split-and-overfitting', title: 'Train/Test Split and Overfitting', description: 'Why every model must be evaluated on data it has never seen — and what overfitting looks like in practice', tags: ['train_test_split', 'Overfitting vs underfitting', 'Bias-variance tradeoff', 'Validation sets'], status: 'coming-soon', readTime: '16–22 min' },
      { id: 46, slug: 'linear-regression-from-scratch', title: 'Linear Regression from Scratch', description: 'Predicting watch time from subscriber attributes — the math, then scikit-learn', tags: ['Linear regression', 'Coefficients', 'scikit-learn basics', 'R-squared'], status: 'coming-soon', readTime: '18–24 min' },
      { id: 47, slug: 'classification-with-logistic-regression', title: 'Classification with Logistic Regression', description: 'Predicting subscriber churn — probability outputs, decision thresholds, and the sigmoid function', tags: ['Logistic regression', 'Sigmoid function', 'Decision threshold', 'Binary classification'], status: 'coming-soon', readTime: '18–24 min' },
      { id: 48, slug: 'model-evaluation-metrics', title: 'Model Evaluation Metrics', description: 'Accuracy, precision, recall, F1, ROC-AUC — and which one actually matters for a churn model', tags: ['Confusion matrix', 'Precision/recall', 'F1 score', 'ROC-AUC'], status: 'coming-soon', readTime: '16–22 min' },
      { id: 49, slug: 'intro-to-feature-engineering', title: 'Intro to Feature Engineering', description: 'Turning raw StreamPulse columns into signals a model can actually learn from', tags: ['Feature creation', 'Encoding categoricals', 'Scaling', 'Feature selection basics'], status: 'coming-soon', readTime: '16–22 min' },
    ],
  },
  {
    id: 11, title: 'Real-World Case Studies and Career', color: '#0ea5e9', difficulty: 'Advanced',
    modules: [
      { id: 50, slug: 'churn-analysis-case-study', title: 'Churn Analysis — Full Case Study', description: 'Start to finish: why StreamPulse subscribers cancel, using everything from Modules 1–49', tags: ['Case study', 'Churn drivers', 'End-to-end analysis', 'Stakeholder summary'], status: 'coming-soon', readTime: '22–30 min' },
      { id: 51, slug: 'cohort-and-retention-analysis', title: 'Cohort and Retention Analysis', description: 'The analysis every subscription business runs monthly — signup cohorts, retention curves, and churn by segment', tags: ['Cohort analysis', 'Retention curves', 'Signup cohorts', 'Segment comparison'], status: 'coming-soon', readTime: '18–24 min' },
      { id: 52, slug: 'data-science-interview-questions', title: 'Data Science Interview Questions', description: '30 real interview questions with complete answers — statistics, pandas, SQL crossover, and case study rounds', tags: ['Interview prep', 'Statistics questions', 'Pandas questions', 'Case study rounds'], status: 'coming-soon', readTime: '24–30 min' },
      { id: 53, slug: 'building-your-portfolio-project', title: 'Building Your Portfolio Project', description: 'Turning a StreamPulse-style analysis into a portfolio piece that gets you hired', tags: ['Portfolio projects', 'GitHub presentation', 'Project write-ups', 'What recruiters look for'], status: 'coming-soon', readTime: '14–20 min' },
    ],
  },
];
