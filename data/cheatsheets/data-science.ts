import type { TrackCheatSheet } from '@/lib/cheatsheet'

export const dataScienceCheatSheet: TrackCheatSheet = {
  track: 'data-science',
  title: 'Data Science',
  trackHref: '/learn/data-science',
  accent: '#f59e0b',
  blurb: 'A reference for the ideas this track is building — frame a question, get the data, clean it, explore it, model carefully, and communicate a decision. It is not a full library of every data-science package. Three lessons are live; the rest of the map is still ahead.',
  sections: [
    {
      title: 'What the work is',
      entries: [
        { label: 'A working definition', code: `Turn a decision into a question,\nthen into evidence someone can act on.\nThe lifecycle in the live workflow lesson:\n  frame, collect, clean and explore,\n  analyse or model, validate, communicate.` },
        { label: 'Four titles', code: `data analyst      what already happened\ndata scientist     clean, check, sometimes predict\nML engineer        ship and run the model\ndata engineer      the pipes that make rows exist\nThe live lesson is the long version of this split.` },
        { label: 'Where the track is', code: `Live now\n  what data science is\n  the workflow\n  how the role differs from the other three\nAhead\n  a browser Python playground and StreamPulse\n  cleaning, exploration, charts, then a first model\nThis page stays at that scope.` },
      ],
    },
    {
      title: 'Frame the question',
      entries: [
        { label: 'A question has parts', code: `the decision it will change\nthe unit: a user, a day, a title\nthe metric\nthe time window\n"Analyze the data" is not a plan.` },
        { label: 'One you could answer', code: `"Which plan has the higher cancel rate\n this quarter, in this extract?"\nNames the metric, the group, and the window.\nIt does not pretend to know why.` },
        { label: 'Write this first', code: `What result would change the decision?\nWhat will you refuse to claim?\nWhich table could even hold the answer?\nIf no table can, the question is still a wish.` },
      ],
    },
    {
      title: 'Data you can name',
      entries: [
        { label: 'StreamPulse tables', code: `users            who signed up\ntitles           the catalog\nsubscriptions    plan, price, status, cancel reason\nwatch_history    minutes and whether they finished\nratings          a score and a review\nOne fictional service, reused as the track grows.` },
        { label: 'Grain', code: `A row is one observation.\nA column is one attribute.\nuser_id and title_id are how tables meet.\nIf you cannot name the grain, do not average yet.` },
        { label: 'A row in plain Python', code: `user = {\n    "user_id": 1,\n    "country": "IN",\n    "plan": "basic",\n    "signup_date": "2024-01-03",\n}\n# later lessons move this into a table tool\n# sketch — that library is not required here` },
      ],
    },
    {
      title: 'Clean',
      entries: [
        { label: 'Missing', code: `def missing(value):\n    return value is None or value == ""\n\ndef complete(rows, keys):\n    kept = [\n        row for row in rows\n        if all(not missing(row.get(key)) for key in keys)\n    ]\n    return kept, len(rows) - len(kept)` },
        { label: 'Types', code: `def as_number(value):\n    try:\n        return float(value)\n    except (TypeError, ValueError):\n        return None\n# a blank that became 0 will move every mean` },
        { label: 'Before you group', code: `Duplicates: same key twice. Keep one, and say which.\nOutliers: far from the rest. A bug, or the story.\nStrings: strip space and agree on case.\nWrite down every drop. A silent filter is a new dataset.` },
      ],
    },
    {
      title: 'Explore',
      entries: [
        { label: 'Mean and median', code: `def mean(xs):\n    return sum(xs) / len(xs)\n\ndef median(xs):\n    ordered = sorted(xs)\n    mid = len(ordered) // 2\n    if len(ordered) % 2:\n        return ordered[mid]\n    return (ordered[mid - 1] + ordered[mid]) / 2\n# skew pulls the mean and leaves the median` },
        { label: 'Count by a key', code: `def counts(rows, key):\n    tally = {}\n    for row in rows:\n        value = row.get(key)\n        tally[value] = tally.get(value, 0) + 1\n    return tally` },
        { label: 'Together is not because', code: `Two columns can move together because\n  one influences the other,\n  both share a cause,\n  or the collection process ties them.\nCorrelation is a clue. It is not the decision.` },
        { label: 'A first pass', code: `how many rows, and how many missing\nthe grain\none distribution: the shape, not only the average\none comparison across a group\nStop when the next chart would not change the question.` },
      ],
    },
    {
      title: 'Model, lightly',
      entries: [
        { label: 'Beat a boring rule', code: `def majority(labels):\n    return max(set(labels), key=labels.count)\n\n# a model maps features to a guess\n# a baseline — majority class, or the mean — comes first\n# if you cannot beat it, do not add complexity` },
        { label: 'Hold some rows out', code: `def holdout(rows, frac=0.8):\n    cut = int(len(rows) * frac)\n    return rows[:cut], rows[cut:]\n# shuffle, or cut by time if the decision is about later\n# test rows do not teach the rule` },
        { label: 'Names the later lessons use', code: `linear regression    a weighted sum for a number\nlogistic regression  a weighted sum, then a probability\ntrain / test split   so the score is on unseen rows\noverfitting          memorising this extract\n# sketch — no modelling library is imported here` },
      ],
    },
    {
      title: 'Communicate',
      entries: [
        { label: 'Three lines', code: `the question\nthe number, with how many rows\nthe caveat\nA chart is optional. The sentence is not.` },
        { label: 'Say the size', code: `# shape of a result, not a finding from the dataset\n# "4 of 10 basic rows in this extract are canceled.\n#  The extract is small, so this is a hint."\n"Basic looks worse" is not a result.` },
        { label: 'If you do draw it', code: `bar       compare categories\nline      something over time\nscatter   two numbers, one point each\nThe title states the claim, not the chart type.\nChart libraries show up in later lessons, not this page.` },
      ],
    },
    {
      title: 'How the roles differ',
      entries: [
        { label: 'Read the verbs', code: `pipelines, warehouses, freshness   data engineering\ndashboards, SQL, weekly KPIs       analytics\nquestions, checks, a careful model data science\ndeploy, latency, monitoring        ML engineering\nThe job title on the post is the weak signal.` },
        { label: 'One question, four owners', code: `"Why did cancels rise?"\n  analyst        slice what already happened\n  scientist      test a reason, and attach a caveat\n  ML engineer    score who might cancel next, in production\n  data engineer  make sure yesterday's events arrived` },
        { label: 'A day, not a toolbox', code: `The live "what is data science" lesson\nwalks a working day, not a package list.\nExcel still fits a small tidy table.\nPython is how a cleaning step gets repeated\nand shown. The playground lesson is still ahead.` },
      ],
    },
    {
      title: 'Validate the claim',
      entries: [
        { label: 'Before you send it', code: `Is "cancel" the same column in every table?\nDid a join multiply rows?\nIs the window the one the decision uses?\nWould someone act — and on which number?` },
        { label: 'A rate you can recompute', code: `def rate(flags):\n    if not flags:\n        return None\n    return sum(1 for flag in flags if flag) / len(flags)\n# print the numerator and the denominator beside it` },
        { label: 'Leakage', code: `A feature that only exists after the outcome\nmakes a brilliant score that fails next month.\nWhen the decision is about the future,\nhold out a later period, not a random shuffle\nof the same week.` },
      ],
    },
  ],
  projects: [
    { title: 'Question card', level: 'Beginner', build: 'For a streaming service like StreamPulse, write one decision, one metric, the tables you would need by name, and what result would change your mind. Do not compute anything yet.', skills: ['problem framing', 'metrics', 'grain'] },
    { title: 'Clean ten rows', level: 'Beginner', build: 'Type about ten subscription dicts in pure Python. Count missing cancel reasons, drop rows with no plan, and write two lines on what you removed and why.', skills: ['missing values', 'types', 'a cleaning log'] },
    { title: 'Mean, median, and a group', level: 'Intermediate', build: 'On a small list of watch minutes you type yourself, report mean and median and a count by plan or device. Say whether the mean is a fair summary of that list.', skills: ['distributions', 'groupby by hand', 'skew'] },
    { title: 'Stakeholder note', level: 'Intermediate', build: 'Half a page: the question, what you cleaned, one comparison, and one caveat. No charting library. A reader who skips the code should still know what not to do.', skills: ['storytelling', 'sample size', 'caveats'] },
    { title: 'Model card without a library', level: 'Advanced', build: 'Write the guess you want (cancel or not), the baseline (majority class), what you would hold out, which mistake is worse, and what you will not claim from a few dozen rows. Optional: compute the baseline with the majority helper on this page.', skills: ['baselines', 'holdout', 'overclaiming'] },
  ],
}
