// ─────────────────────────────────────────────────────────────────────────────
// Sample databases for the main Code Playground's SQL mode.
// Each one loads into a fresh in-memory sql.js database before the student's
// own query runs, so CREATE TABLE/INSERT never need to be typed by hand —
// pick a database, browse its schema, and start writing SELECTs.
// ─────────────────────────────────────────────────────────────────────────────
import { FRESHCART_SCHEMA_SQL, FRESHCART_SEED_SQL, SQL_TABLES } from './sql-freshcart';

export interface PlaygroundTableColumn {
  name: string;
  type: string;
  note?: string;
}

export interface PlaygroundTable {
  name: string;
  color: string;
  rowCount: number;
  columns: PlaygroundTableColumn[];
}

export interface PlaygroundDatabase {
  id: string;
  name: string;
  description: string;
  color: string;
  schemaSql: string;
  seedSql: string;
  tables: PlaygroundTable[];
  exampleQuery: string;
}

// ─── TechCorp — HR / org-chart data (self-joins, GROUP BY, salary analysis) ──
const TECHCORP_SCHEMA_SQL = `
CREATE TABLE IF NOT EXISTS departments (
  department_id   INTEGER PRIMARY KEY,
  department_name VARCHAR,
  location        VARCHAR,
  budget          DECIMAL
);

CREATE TABLE IF NOT EXISTS employees (
  employee_id   INTEGER PRIMARY KEY,
  first_name    VARCHAR,
  last_name     VARCHAR,
  email         VARCHAR,
  job_title     VARCHAR,
  department_id INTEGER,
  salary        DECIMAL,
  hire_date     DATE,
  manager_id    INTEGER
);

CREATE TABLE IF NOT EXISTS projects (
  project_id    INTEGER PRIMARY KEY,
  project_name  VARCHAR,
  department_id INTEGER,
  start_date    DATE,
  end_date      DATE,
  budget        DECIMAL,
  status        VARCHAR
);

CREATE TABLE IF NOT EXISTS project_assignments (
  assignment_id   INTEGER PRIMARY KEY,
  project_id      INTEGER,
  employee_id     INTEGER,
  role            VARCHAR,
  hours_allocated INTEGER
);
`;

const TECHCORP_SEED_SQL = `
INSERT INTO departments VALUES
(1,'Engineering','Austin, TX',4200000),
(2,'Sales','Chicago, IL',1800000),
(3,'Marketing','Chicago, IL',950000),
(4,'Product','Austin, TX',1100000),
(5,'Executive','Austin, TX',600000);

INSERT INTO employees VALUES
(1,'Rachel','Kim','rachel.kim@techcorp.io','CEO',5,265000,'2017-01-10',NULL),
(2,'Marcus','Alvarez','marcus.alvarez@techcorp.io','VP of Engineering',1,215000,'2017-04-03',1),
(3,'Priya','Nair','priya.nair@techcorp.io','VP of Sales',2,205000,'2017-06-15',1),
(4,'Daniel','Foster','daniel.foster@techcorp.io','VP of Product',4,210000,'2018-02-20',1),
(5,'Grace','Liu','grace.liu@techcorp.io','Engineering Manager',1,178000,'2018-05-14',2),
(6,'Tomas','Novak','tomas.novak@techcorp.io','Engineering Manager',1,175000,'2019-01-08',2),
(7,'Sofia','Reyes','sofia.reyes@techcorp.io','Senior Software Engineer',1,168000,'2018-09-11',5),
(8,'Ben','Whitfield','ben.whitfield@techcorp.io','Senior Software Engineer',1,165000,'2019-03-25',5),
(9,'Aisha','Mohammed','aisha.mohammed@techcorp.io','Software Engineer',1,138000,'2021-06-01',5),
(10,'Kevin','Park','kevin.park@techcorp.io','Software Engineer',1,135000,'2021-09-13',6),
(11,'Laura','Bianchi','laura.bianchi@techcorp.io','Software Engineer',1,132000,'2022-02-07',6),
(12,'Owen','Brooks','owen.brooks@techcorp.io','QA Engineer',1,112000,'2020-11-16',6),
(13,'Natalie','Okafor','natalie.okafor@techcorp.io','Sales Manager',2,152000,'2018-08-20',3),
(14,'Diego','Santos','diego.santos@techcorp.io','Account Executive',2,118000,'2019-10-04',13),
(15,'Hannah','Cole','hannah.cole@techcorp.io','Account Executive',2,115000,'2020-04-27',13),
(16,'Ryan','Mitchell','ryan.mitchell@techcorp.io','Sales Development Rep',2,78000,'2022-07-18',13),
(17,'Chloe','Dubois','chloe.dubois@techcorp.io','Marketing Manager',3,132000,'2019-02-11',1),
(18,'Ethan','Wallace','ethan.wallace@techcorp.io','Content Strategist',3,94000,'2021-01-25',17),
(19,'Mia','Sato','mia.sato@techcorp.io','Product Manager',4,148000,'2019-07-09',4),
(20,'Lucas','Ferreira','lucas.ferreira@techcorp.io','Product Designer',4,126000,'2020-10-19',4);

INSERT INTO projects VALUES
(1,'Checkout Redesign',1,'2025-01-06','2025-04-18',180000,'Completed'),
(2,'Mobile App v3',1,'2025-03-01','2025-09-30',420000,'In Progress'),
(3,'API Platform Migration',1,'2025-05-12',NULL,310000,'In Progress'),
(4,'Internal Analytics Dashboard',1,'2025-02-10','2025-05-02',95000,'Completed'),
(5,'Enterprise Sales Playbook',2,'2025-01-20','2025-03-14',40000,'Completed'),
(6,'West Region Expansion',2,'2025-04-01',NULL,220000,'In Progress'),
(7,'Q3 Brand Campaign',3,'2025-06-01','2025-08-29',150000,'In Progress'),
(8,'Content Hub Relaunch',3,'2025-02-15','2025-05-30',60000,'Completed'),
(9,'Pricing Tier Overhaul',4,'2025-03-10','2025-06-20',85000,'Completed'),
(10,'AI Assistant Beta',4,'2025-07-01',NULL,275000,'In Progress');

INSERT INTO project_assignments VALUES
(1,1,5,'Lead',220),
(2,1,7,'Contributor',180),
(3,1,9,'Contributor',150),
(4,1,12,'QA',90),
(5,2,6,'Lead',380),
(6,2,10,'Contributor',300),
(7,2,11,'Contributor',290),
(8,2,12,'QA',160),
(9,3,5,'Lead',260),
(10,3,8,'Contributor',240),
(11,3,9,'Contributor',200),
(12,4,6,'Lead',140),
(13,4,10,'Contributor',120),
(14,5,13,'Lead',90),
(15,5,14,'Contributor',70),
(16,6,13,'Lead',180),
(17,6,15,'Contributor',160),
(18,6,16,'Contributor',110),
(19,7,17,'Lead',150),
(20,7,18,'Contributor',140),
(21,8,17,'Lead',80),
(22,8,18,'Contributor',95),
(23,9,19,'Lead',130),
(24,9,20,'Contributor',110),
(25,10,19,'Lead',210),
(26,10,20,'Contributor',190),
(27,10,7,'Contributor',100),
(28,10,8,'Contributor',95),
(29,4,19,'Stakeholder',40),
(30,2,19,'Stakeholder',35);
`;

const TECHCORP_TABLES: PlaygroundTable[] = [
  {
    name: 'departments', color: '#0078d4', rowCount: 5,
    columns: [
      { name: 'department_id', type: 'INTEGER', note: 'Primary Key' },
      { name: 'department_name', type: 'VARCHAR' },
      { name: 'location', type: 'VARCHAR' },
      { name: 'budget', type: 'DECIMAL', note: 'Annual USD' },
    ],
  },
  {
    name: 'employees', color: '#06b6d4', rowCount: 20,
    columns: [
      { name: 'employee_id', type: 'INTEGER', note: 'Primary Key' },
      { name: 'first_name', type: 'VARCHAR' },
      { name: 'last_name', type: 'VARCHAR' },
      { name: 'email', type: 'VARCHAR' },
      { name: 'job_title', type: 'VARCHAR' },
      { name: 'department_id', type: 'INTEGER', note: 'FK → departments' },
      { name: 'salary', type: 'DECIMAL', note: 'Annual USD' },
      { name: 'hire_date', type: 'DATE' },
      { name: 'manager_id', type: 'INTEGER', note: 'FK → employees (self) — NULL for the CEO' },
    ],
  },
  {
    name: 'projects', color: '#f97316', rowCount: 10,
    columns: [
      { name: 'project_id', type: 'INTEGER', note: 'Primary Key' },
      { name: 'project_name', type: 'VARCHAR' },
      { name: 'department_id', type: 'INTEGER', note: 'FK → departments' },
      { name: 'start_date', type: 'DATE' },
      { name: 'end_date', type: 'DATE', note: 'NULL if still in progress' },
      { name: 'budget', type: 'DECIMAL' },
      { name: 'status', type: 'VARCHAR', note: 'Completed/In Progress' },
    ],
  },
  {
    name: 'project_assignments', color: '#8b5cf6', rowCount: 30,
    columns: [
      { name: 'assignment_id', type: 'INTEGER', note: 'Primary Key' },
      { name: 'project_id', type: 'INTEGER', note: 'FK → projects' },
      { name: 'employee_id', type: 'INTEGER', note: 'FK → employees' },
      { name: 'role', type: 'VARCHAR', note: 'Lead/Contributor/QA/Stakeholder' },
      { name: 'hours_allocated', type: 'INTEGER' },
    ],
  },
];

// ─── StreamFlix — movies/actors/genres (many-to-many joins, junction tables) ─
const STREAMFLIX_SCHEMA_SQL = `
CREATE TABLE IF NOT EXISTS directors (
  director_id  INTEGER PRIMARY KEY,
  first_name   VARCHAR,
  last_name    VARCHAR,
  country      VARCHAR,
  birth_year   INTEGER
);

CREATE TABLE IF NOT EXISTS actors (
  actor_id     INTEGER PRIMARY KEY,
  first_name   VARCHAR,
  last_name    VARCHAR,
  country      VARCHAR,
  birth_year   INTEGER
);

CREATE TABLE IF NOT EXISTS genres (
  genre_id    INTEGER PRIMARY KEY,
  genre_name  VARCHAR
);

CREATE TABLE IF NOT EXISTS movies (
  movie_id        INTEGER PRIMARY KEY,
  title           VARCHAR,
  release_year    INTEGER,
  runtime_minutes INTEGER,
  director_id     INTEGER,
  mpaa_rating     VARCHAR,
  imdb_rating     DECIMAL
);

CREATE TABLE IF NOT EXISTS movie_genres (
  movie_id  INTEGER,
  genre_id  INTEGER
);

CREATE TABLE IF NOT EXISTS movie_cast (
  cast_id        INTEGER PRIMARY KEY,
  movie_id       INTEGER,
  actor_id       INTEGER,
  character_name VARCHAR
);
`;

const STREAMFLIX_SEED_SQL = `
INSERT INTO directors VALUES
(1,'Elena','Voss','Germany',1978),
(2,'Marcus','Reid','USA',1971),
(3,'Ingrid','Solberg','Norway',1983),
(4,'Tomás','Herrera','Mexico',1975),
(5,'Priya','Chandran','India',1980),
(6,'Kenji','Watanabe','Japan',1969),
(7,'Naomi','Clarke','UK',1985),
(8,'Victor','Dumont','France',1973);

INSERT INTO actors VALUES
(1,'Jonah','Pierce','USA',1988),
(2,'Selene','Kade','Canada',1990),
(3,'Marcus','Byrne','Ireland',1985),
(4,'Aiko','Tanaka','Japan',1992),
(5,'Diego','Salazar','Mexico',1987),
(6,'Freya','Lindqvist','Sweden',1991),
(7,'Malik','Osei','Ghana',1986),
(8,'Isabella','Conti','Italy',1993),
(9,'Owen','Fitzgerald','Ireland',1980),
(10,'Layla','Haddad','Jordan',1989),
(11,'Theo','Marchetti','Italy',1995),
(12,'Nadia','Petrov','Russia',1984),
(13,'Sam','Whitaker','USA',1979),
(14,'Yuki','Sato','Japan',1990),
(15,'Clara','Fontaine','France',1988);

INSERT INTO genres VALUES
(1,'Action'),(2,'Drama'),(3,'Comedy'),(4,'Sci-Fi'),
(5,'Thriller'),(6,'Romance'),(7,'Documentary'),(8,'Animation');

INSERT INTO movies VALUES
(1,'Glass Horizon',2019,128,1,'PG-13',7.8),
(2,'The Long Static',2021,142,2,'R',8.1),
(3,'Paper Tigers',2018,101,3,'PG',6.9),
(4,'Nine Days of Rain',2022,116,1,'PG-13',7.4),
(5,'Concrete Orbit',2020,134,4,'R',8.3),
(6,'The Quiet Machinist',2017,109,5,'PG',7.1),
(7,'Aftertaste',2023,98,6,'R',6.5),
(8,'Signal to Noise',2021,121,2,'PG-13',7.9),
(9,'Salt and Static',2019,105,7,'PG',6.8),
(10,'The Last Cartographer',2022,138,3,'PG-13',8.0),
(11,'Borrowed Light',2018,112,8,'R',7.6),
(12,'Midnight Ferry',2020,99,4,'PG-13',6.7),
(13,'Two Rivers',2016,124,5,'PG',7.3),
(14,'The Unreliable Witness',2023,131,2,'R',8.2),
(15,'Static Bloom',2021,107,6,'PG',6.6),
(16,'Foxglove',2019,118,7,'PG-13',7.0),
(17,'The Cartography of Grief',2022,145,1,'R',8.4),
(18,'Low Tide Radio',2017,103,8,'PG',6.9),
(19,'Orbit and Ash',2020,127,4,'PG-13',7.7),
(20,'The Understudy',2023,110,3,'PG-13',7.2);

INSERT INTO movie_genres VALUES
(1,4),(1,5),(2,2),(2,5),(3,3),(3,2),(4,2),(4,6),(5,4),(5,1),
(6,2),(6,7),(7,3),(7,6),(8,4),(8,5),(9,7),(9,2),(10,2),(10,5),
(11,2),(11,6),(12,5),(12,4),(13,2),(13,7),(14,5),(14,2),(15,6),(15,3),
(16,7),(16,2),(17,2),(17,5),(18,7),(18,3),(19,4),(19,1),(20,3),(20,2);

INSERT INTO movie_cast VALUES
(1,1,1,'Adrian Kessler'),(2,1,6,'Ines Larsen'),(3,1,13,'Colonel Marsh'),
(4,2,2,'Detective Row'),(5,2,9,'Warden Coyle'),
(6,3,4,'Nao'),(7,3,8,'Priya Malhotra'),
(8,4,1,'Adrian Kessler'),(9,4,10,'Rania'),(10,4,7,'Marcus Boone'),
(11,5,5,'Emiliano Cruz'),(12,5,12,'Vera Sokolov'),(13,5,3,'Grant Cole'),
(14,6,14,'Hiro'),(15,6,4,'Nao'),
(16,7,8,'Priya Malhotra'),(17,7,11,'Dante Rossi'),
(18,8,2,'Detective Row'),(19,8,15,'Margot Delacroix'),(20,8,9,'Warden Coyle'),
(21,9,7,'Marcus Boone'),(22,9,6,'Ines Larsen'),
(23,10,8,'Priya Malhotra'),(24,10,3,'Grant Cole'),(25,10,13,'Colonel Marsh'),
(26,11,15,'Margot Delacroix'),(27,11,11,'Dante Rossi'),
(28,12,5,'Emiliano Cruz'),(29,12,10,'Rania'),
(30,13,12,'Vera Sokolov'),(31,13,14,'Hiro'),(32,13,9,'Warden Coyle'),
(33,14,2,'Detective Row'),(34,14,3,'Grant Cole'),(35,14,15,'Margot Delacroix'),
(36,15,6,'Ines Larsen'),(37,15,7,'Marcus Boone'),
(38,16,4,'Nao'),(39,16,8,'Priya Malhotra'),
(40,17,1,'Adrian Kessler'),(41,17,12,'Vera Sokolov'),(42,17,13,'Colonel Marsh'),
(43,18,11,'Dante Rossi'),(44,18,14,'Hiro'),
(45,19,5,'Emiliano Cruz'),(46,19,10,'Rania'),(47,19,7,'Marcus Boone'),
(48,20,8,'Priya Malhotra'),(49,20,3,'Grant Cole'),(50,20,15,'Margot Delacroix');
`;

const STREAMFLIX_TABLES: PlaygroundTable[] = [
  {
    name: 'directors', color: '#0078d4', rowCount: 8,
    columns: [
      { name: 'director_id', type: 'INTEGER', note: 'Primary Key' },
      { name: 'first_name', type: 'VARCHAR' },
      { name: 'last_name', type: 'VARCHAR' },
      { name: 'country', type: 'VARCHAR' },
      { name: 'birth_year', type: 'INTEGER' },
    ],
  },
  {
    name: 'actors', color: '#06b6d4', rowCount: 15,
    columns: [
      { name: 'actor_id', type: 'INTEGER', note: 'Primary Key' },
      { name: 'first_name', type: 'VARCHAR' },
      { name: 'last_name', type: 'VARCHAR' },
      { name: 'country', type: 'VARCHAR' },
      { name: 'birth_year', type: 'INTEGER' },
    ],
  },
  {
    name: 'genres', color: '#f59e0b', rowCount: 8,
    columns: [
      { name: 'genre_id', type: 'INTEGER', note: 'Primary Key' },
      { name: 'genre_name', type: 'VARCHAR' },
    ],
  },
  {
    name: 'movies', color: '#f97316', rowCount: 20,
    columns: [
      { name: 'movie_id', type: 'INTEGER', note: 'Primary Key' },
      { name: 'title', type: 'VARCHAR' },
      { name: 'release_year', type: 'INTEGER' },
      { name: 'runtime_minutes', type: 'INTEGER' },
      { name: 'director_id', type: 'INTEGER', note: 'FK → directors' },
      { name: 'mpaa_rating', type: 'VARCHAR', note: 'PG/PG-13/R' },
      { name: 'imdb_rating', type: 'DECIMAL', note: '0–10' },
    ],
  },
  {
    name: 'movie_genres', color: '#8b5cf6', rowCount: 40,
    columns: [
      { name: 'movie_id', type: 'INTEGER', note: 'FK → movies' },
      { name: 'genre_id', type: 'INTEGER', note: 'FK → genres — junction table, a movie can have several' },
    ],
  },
  {
    name: 'movie_cast', color: '#10b981', rowCount: 50,
    columns: [
      { name: 'cast_id', type: 'INTEGER', note: 'Primary Key' },
      { name: 'movie_id', type: 'INTEGER', note: 'FK → movies' },
      { name: 'actor_id', type: 'INTEGER', note: 'FK → actors — junction table, an actor can appear in several movies' },
      { name: 'character_name', type: 'VARCHAR' },
    ],
  },
];

export const PLAYGROUND_DATABASES: PlaygroundDatabase[] = [
  {
    id: 'none',
    name: 'None — blank database',
    description: 'Write your own CREATE TABLE statements from scratch.',
    color: '#888888',
    schemaSql: '',
    seedSql: '',
    tables: [],
    exampleQuery: `CREATE TABLE users (id INTEGER, name TEXT, age INTEGER);
INSERT INTO users VALUES (1, 'Alice', 30), (2, 'Bob', 27);
SELECT * FROM users;`,
  },
  {
    id: 'freshcart',
    name: 'FreshCart — e-commerce',
    description: 'A US grocery chain: stores, customers, employees, products, orders, order_items. Good for JOINs, aggregates, and business-analytics style queries.',
    color: '#00e676',
    schemaSql: FRESHCART_SCHEMA_SQL,
    seedSql: FRESHCART_SEED_SQL,
    tables: SQL_TABLES,
    exampleQuery: `SELECT first_name, last_name, city, loyalty_tier
FROM customers
LIMIT 5;`,
  },
  {
    id: 'techcorp',
    name: 'TechCorp — company org chart',
    description: 'departments, employees, projects, project_assignments. Employees self-reference a manager — good for self-joins, recursive-style hierarchy queries, GROUP BY / HAVING on salary.',
    color: '#7b61ff',
    schemaSql: TECHCORP_SCHEMA_SQL,
    seedSql: TECHCORP_SEED_SQL,
    tables: TECHCORP_TABLES,
    exampleQuery: `SELECT e.first_name, e.last_name, e.job_title, d.department_name
FROM employees e
JOIN departments d ON e.department_id = d.department_id
LIMIT 10;`,
  },
  {
    id: 'streamflix',
    name: 'StreamFlix — movies & cast',
    description: 'directors, actors, genres, movies, plus movie_genres and movie_cast junction tables. Good for many-to-many JOINs and subqueries.',
    color: '#ff4757',
    schemaSql: STREAMFLIX_SCHEMA_SQL,
    seedSql: STREAMFLIX_SEED_SQL,
    tables: STREAMFLIX_TABLES,
    exampleQuery: `SELECT m.title, m.release_year, d.first_name || ' ' || d.last_name AS director
FROM movies m
JOIN directors d ON m.director_id = d.director_id
ORDER BY m.imdb_rating DESC
LIMIT 10;`,
  },
];
