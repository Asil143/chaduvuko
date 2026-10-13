import type { ProjectIdea } from '@/lib/cheatsheet'

/** Project ideas for the hand-built SQL cheat sheet. */
export const SQL_PROJECTS: ProjectIdea[] = [
  { title: 'FreshCart questions', level: 'Beginner', build: 'Answer ten questions about the FreshCart tables with SELECT, WHERE, ORDER BY, and LIMIT. Write the question as a comment above each query.', skills: ['SELECT', 'WHERE', 'ORDER BY'] },
  { title: 'Customer rollup', level: 'Beginner', build: 'One query per customer: order count, total spent, and the date of the last order. Customers with no orders still appear.', skills: ['JOIN', 'GROUP BY', 'LEFT JOIN'] },
  { title: 'Top products by city', level: 'Intermediate', build: 'Rank products inside each city by revenue. Return only the top three per city.', skills: ['JOIN', 'window functions', 'RANK'] },
  { title: 'Month-over-month', level: 'Intermediate', build: 'Revenue by month, plus the previous month and the change, using LAG. Explain one month where the number moved.', skills: ['aggregation', 'LAG', 'CTE'] },
  { title: 'Slow query, then an index', level: 'Advanced', build: 'Take a filter-and-join query, read EXPLAIN, add one index that matches the filter, and show the plan again.', skills: ['EXPLAIN', 'indexes', 'transactions'] },
]
