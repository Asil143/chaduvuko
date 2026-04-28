// ─────────────────────────────────────────────────────────────────────────────
// FreshCart SQL Database
// Fictional US grocery chain · 10 stores across the United States
// Used across all SQL modules — currency: USD
// ─────────────────────────────────────────────────────────────────────────────

export const FRESHCART_SCHEMA_SQL = `
CREATE TABLE IF NOT EXISTS stores (
  store_id       VARCHAR PRIMARY KEY,
  store_name     VARCHAR,
  city           VARCHAR,
  state          VARCHAR,
  manager_name   VARCHAR,
  opened_date    DATE,
  monthly_target DECIMAL
);

CREATE TABLE IF NOT EXISTS customers (
  customer_id  INTEGER PRIMARY KEY,
  first_name   VARCHAR,
  last_name    VARCHAR,
  email        VARCHAR,
  phone        VARCHAR,
  city         VARCHAR,
  state        VARCHAR,
  zip_code     VARCHAR,
  joined_date  DATE,
  loyalty_tier VARCHAR
);

CREATE TABLE IF NOT EXISTS employees (
  employee_id  INTEGER PRIMARY KEY,
  first_name   VARCHAR,
  last_name    VARCHAR,
  role         VARCHAR,
  department   VARCHAR,
  store_id     VARCHAR,
  salary       DECIMAL,
  hire_date    DATE,
  manager_id   INTEGER
);

CREATE TABLE IF NOT EXISTS products (
  product_id   INTEGER PRIMARY KEY,
  product_name VARCHAR,
  category     VARCHAR,
  sub_category VARCHAR,
  brand        VARCHAR,
  unit_price   DECIMAL,
  cost_price   DECIMAL,
  unit         VARCHAR,
  in_stock     BOOLEAN
);

CREATE TABLE IF NOT EXISTS orders (
  order_id       INTEGER PRIMARY KEY,
  customer_id    INTEGER,
  store_id       VARCHAR,
  order_date     DATE,
  delivery_date  DATE,
  order_status   VARCHAR,
  payment_method VARCHAR,
  total_amount   DECIMAL
);

CREATE TABLE IF NOT EXISTS order_items (
  item_id      INTEGER PRIMARY KEY,
  order_id     INTEGER,
  product_id   INTEGER,
  quantity     INTEGER,
  unit_price   DECIMAL,
  discount_pct DECIMAL,
  line_total   DECIMAL
);
`;

export const FRESHCART_SEED_SQL = `
INSERT INTO stores VALUES
('ST001','FreshCart Manhattan','New York','NY','Sarah Mitchell','2020-01-15',280000),
('ST002','FreshCart Brooklyn','New York','NY','James Chen','2020-06-10',240000),
('ST003','FreshCart Chicago Loop','Chicago','IL','Maria Gonzalez','2019-11-20',195000),
('ST004','FreshCart Lincoln Park','Chicago','IL','David Park','2021-03-05',230000),
('ST005','FreshCart West Hollywood','Los Angeles','CA','Jennifer Kim','2019-08-12',350000),
('ST006','FreshCart Santa Monica','Los Angeles','CA','Michael Torres','2020-09-22',310000),
('ST007','FreshCart South Austin','Austin','TX','Ashley Williams','2021-01-18',175000),
('ST008','FreshCart Capitol Hill','Seattle','WA','Robert Johnson','2019-05-30',385000),
('ST009','FreshCart Pearl District','Portland','OR','Emily Davis','2020-11-08',210000),
('ST010','FreshCart Scottsdale','Phoenix','AZ','Christopher Lee','2021-07-14',155000);

INSERT INTO customers VALUES
(1,'Emma','Johnson','emma.johnson@gmail.com','(206)555-0101','Seattle','WA','98101','2022-03-15','Gold'),
(2,'Liam','Williams','liam.williams@outlook.com','(312)555-0102','Chicago','IL','60601','2021-07-22','Silver'),
(3,'Olivia','Brown','olivia.brown@yahoo.com','(323)555-0103','Los Angeles','CA','90028','2023-01-10','Bronze'),
(4,'Noah','Jones','noah.jones@gmail.com','(480)555-0104','Phoenix','AZ','85251','2022-11-05','Platinum'),
(5,'Ava','Garcia','ava.garcia@gmail.com','(206)555-0105','Seattle','WA','98102','2021-05-18','Gold'),
(6,'William','Davis','william.davis@hotmail.com','(312)555-0106','Chicago','IL','60614','2023-06-30','Bronze'),
(7,'Sophia','Martinez','sophia.martinez@gmail.com','(212)555-0107','New York','NY','10001','2020-09-14','Platinum'),
(8,'James','Wilson','james.wilson@gmail.com','(503)555-0108','Portland','OR','97201','2022-04-27','Silver'),
(9,'Isabella','Anderson','isabella.anderson@gmail.com','(212)555-0109','New York','NY','10016','2021-12-03','Gold'),
(10,'Oliver','Taylor','oliver.taylor@gmail.com','(512)555-0110','Austin','TX','78701','2023-02-19','Bronze'),
(11,'Mia','Thomas','mia.thomas@gmail.com','(503)555-0111','Portland','OR','97209','2020-07-08','Platinum'),
(12,'Elijah','Jackson','elijah.jackson@gmail.com','(323)555-0112','Los Angeles','CA','90046','2022-08-16','Silver'),
(13,'Charlotte','White','charlotte.white@gmail.com','(512)555-0113','Austin','TX','78704','2021-10-29','Gold'),
(14,'Lucas','Harris','lucas.harris@gmail.com','(206)555-0114','Seattle','WA','98103','2023-03-07','Bronze'),
(15,'Amelia','Martin','amelia.martin@gmail.com','(212)555-0115','New York','NY','10019','2022-01-25','Gold'),
(16,'Mason','Thompson','mason.thompson@gmail.com','(206)555-0116','Seattle','WA','98115','2020-11-12','Platinum'),
(17,'Harper','Garcia','harper.garcia@hotmail.com','(312)555-0117','Chicago','IL','60657','2023-07-20','Bronze'),
(18,'Evelyn','Robinson','evelyn.robinson@gmail.com','(206)555-0118','Seattle','WA','98104','2021-04-11','Silver'),
(19,'Logan','Clark','logan.clark@gmail.com','(503)555-0119','Portland','OR','97210','2022-09-03','Gold'),
(20,'Abigail','Lewis','abigail.lewis@gmail.com','(212)555-0120','New York','NY','10030','2021-03-22','Silver');

INSERT INTO employees VALUES
(1,'Sarah','Mitchell','Store Manager','Management','ST001',68000,'2019-12-01',NULL),
(2,'Tyler','Reed','Assistant Manager','Management','ST001',45000,'2020-02-15',1),
(3,'Amanda','Foster','Cashier','Operations','ST001',33000,'2020-06-01',2),
(4,'Brandon','Cole','Cashier','Operations','ST001',33000,'2021-01-10',2),
(5,'James','Chen','Store Manager','Management','ST002',71000,'2020-05-01',NULL),
(6,'Rachel','Kim','Assistant Manager','Management','ST002',46000,'2020-07-20',5),
(7,'Carlos','Ruiz','Stock Supervisor','Operations','ST002',38000,'2021-03-15',6),
(8,'Maria','Gonzalez','Store Manager','Management','ST003',65000,'2019-10-01',NULL),
(9,'Kevin','Park','Cashier','Operations','ST003',32000,'2020-08-01',8),
(10,'David','Park','Store Manager','Management','ST004',69000,'2021-02-01',NULL),
(11,'Jennifer','Kim','Store Manager','Management','ST005',78000,'2019-07-01',NULL),
(12,'Nathan','Scott','Assistant Manager','Management','ST005',50000,'2019-09-15',11),
(13,'Emily','Davis','Store Manager','Management','ST009',64000,'2020-10-01',NULL),
(14,'Christopher','Lee','Store Manager','Management','ST010',61000,'2021-06-01',NULL),
(15,'Robert','Johnson','Store Manager','Management','ST008',75000,'2019-04-01',NULL);

INSERT INTO products VALUES
(1,'All-Purpose Flour','Staples','Flour','King Arthur',5.99,3.99,'5lb bag',true),
(2,'Jasmine Rice','Staples','Rice','Mahatma',8.99,5.99,'5lb bag',true),
(3,'Red Lentils','Staples','Legumes','Bob s Red Mill',3.49,2.19,'1lb',true),
(4,'Sea Salt','Staples','Salt','Morton',2.99,1.79,'26oz',true),
(5,'Whole Milk','Dairy','Milk','Horizon Organic',5.49,3.69,'half gallon',true),
(6,'Salted Butter','Dairy','Butter','Tillamook',6.49,4.29,'16oz',true),
(7,'Cottage Cheese','Dairy','Cheese','Daisy',4.99,3.19,'16oz',true),
(8,'Sourdough Bread','Bakery','Bread','Dave s Killer',5.99,3.89,'loaf',true),
(9,'Large Eggs','Dairy','Eggs','Vital Farms',5.99,3.99,'dozen',true),
(10,'Roma Tomatoes','Vegetables','Tomatoes','Local',2.99,1.79,'1lb',true),
(11,'Yellow Onions','Vegetables','Onions','Local',1.99,1.19,'3lb bag',true),
(12,'Russet Potatoes','Vegetables','Potatoes','Local',4.99,2.99,'5lb bag',true),
(13,'Bananas','Fruits','Bananas','Dole',1.29,0.79,'bunch',true),
(14,'Honeycrisp Apples','Fruits','Apples','Local',6.99,4.49,'3lb bag',true),
(15,'Instant Ramen','Packaged Food','Noodles','Maruchan',0.99,0.49,'3oz pack',true),
(16,'Old Fashioned Oats','Packaged Food','Oats','Quaker',5.49,3.49,'18oz',true),
(17,'Oreo Cookies','Packaged Food','Cookies','Nabisco',5.99,3.79,'14.3oz',true),
(18,'Extra Virgin Olive Oil','Staples','Oil','California Olive Ranch',12.99,8.49,'16.9oz',true),
(19,'Green Tea','Beverages','Tea','Bigelow',7.99,4.99,'40 bags',true),
(20,'Ground Coffee','Beverages','Coffee','Starbucks',13.99,8.99,'12oz',true),
(21,'Anti-Dandruff Shampoo','Personal Care','Shampoo','Head & Shoulders',8.99,5.49,'13.5oz',true),
(22,'Moisturizing Bar Soap','Personal Care','Soap','Dove',4.49,2.79,'4-pack',true),
(23,'Laundry Detergent','Household','Detergent','Tide',13.99,8.99,'75oz',true),
(24,'Purified Water','Beverages','Water','Dasani',1.99,0.99,'1L bottle',true),
(25,'Apple Juice','Beverages','Juice','Tropicana',4.99,3.19,'64oz',false);

INSERT INTO orders VALUES
(1001,1,'ST001','2024-01-05','2024-01-07','Delivered','Credit Card',59.69),
(1002,2,'ST003','2024-01-08','2024-01-10','Delivered','Debit Card',27.97),
(1003,3,'ST005','2024-01-10',NULL,'Processing','Credit Card',17.95),
(1004,4,'ST010','2024-01-12','2024-01-14','Delivered','Cash',44.05),
(1005,5,'ST001','2024-01-15','2024-01-17','Delivered','Credit Card',60.17),
(1006,6,'ST004','2024-01-18',NULL,'Cancelled','Debit Card',14.95),
(1007,7,'ST008','2024-01-20','2024-01-22','Delivered','Apple Pay',73.62),
(1008,8,'ST009','2024-01-22','2024-01-24','Delivered','Credit Card',43.18),
(1009,9,'ST008','2024-01-25','2024-01-27','Delivered','Credit Card',40.96),
(1010,10,'ST007','2024-01-28','2024-01-30','Returned','Debit Card',28.52),
(1011,11,'ST009','2024-02-01','2024-02-03','Delivered','Credit Card',60.04),
(1012,12,'ST005','2024-02-03','2024-02-05','Delivered','Debit Card',58.35),
(1013,13,'ST007','2024-02-06','2024-02-08','Delivered','Credit Card',50.92),
(1014,14,'ST001','2024-02-08',NULL,'Processing','Credit Card',15.93),
(1015,15,'ST008','2024-02-10','2024-02-12','Delivered','Debit Card',28.07),
(1016,1,'ST001','2024-02-14','2024-02-16','Delivered','Credit Card',43.49),
(1017,16,'ST001','2024-02-16','2024-02-18','Delivered','Apple Pay',92.10),
(1018,5,'ST002','2024-02-19','2024-02-21','Delivered','Credit Card',62.89),
(1019,17,'ST003','2024-02-22',NULL,'Cancelled','Debit Card',12.94),
(1020,18,'ST001','2024-02-24','2024-02-26','Delivered','Credit Card',53.44),
(1021,19,'ST009','2024-02-27','2024-02-29','Delivered','Credit Card',39.52),
(1022,20,'ST008','2024-03-01','2024-03-03','Delivered','Debit Card',48.05),
(1023,7,'ST008','2024-03-04','2024-03-06','Delivered','Credit Card',46.95),
(1024,9,'ST008','2024-03-07','2024-03-09','Returned','Credit Card',15.27),
(1025,11,'ST009','2024-03-10','2024-03-12','Delivered','Apple Pay',55.63),
(1026,2,'ST003','2024-03-13','2024-03-15','Delivered','Credit Card',49.87),
(1027,13,'ST007','2024-03-16','2024-03-18','Delivered','Debit Card',40.43),
(1028,4,'ST010','2024-03-19','2024-03-21','Delivered','Cash',56.04),
(1029,16,'ST001','2024-03-22','2024-03-24','Delivered','Credit Card',74.12),
(1030,6,'ST004','2024-03-25',NULL,'Processing','Debit Card',43.91);

INSERT INTO order_items VALUES
(1,1001,1,2,5.99,0,11.98),
(2,1001,5,4,5.49,0,21.96),
(3,1001,4,1,2.99,0,2.99),
(4,1001,17,4,5.99,5,22.76),
(5,1002,2,1,8.99,0,8.99),
(6,1002,18,1,12.99,0,12.99),
(7,1002,9,1,5.99,0,5.99),
(8,1003,7,2,4.99,0,9.98),
(9,1003,8,1,5.99,0,5.99),
(10,1003,15,2,0.99,0,1.98),
(11,1004,1,1,5.99,0,5.99),
(12,1004,19,2,7.99,0,15.98),
(13,1004,21,1,8.99,10,8.09),
(14,1004,23,1,13.99,0,13.99),
(15,1005,5,6,5.49,0,32.94),
(16,1005,6,2,6.49,0,12.98),
(17,1005,10,2,2.99,0,5.98),
(18,1005,11,1,1.99,0,1.99),
(19,1005,12,1,4.99,0,4.99),
(20,1005,13,1,1.29,0,1.29),
(21,1006,22,2,4.49,0,8.98),
(22,1006,24,3,1.99,0,5.97),
(23,1007,1,1,5.99,0,5.99),
(24,1007,2,2,8.99,0,17.98),
(25,1007,20,1,13.99,0,13.99),
(26,1007,21,2,8.99,10,16.18),
(27,1007,23,1,13.99,0,13.99),
(28,1007,16,1,5.49,0,5.49),
(29,1008,5,4,5.49,0,21.96),
(30,1008,7,1,4.99,0,4.99),
(31,1008,9,1,5.99,0,5.99),
(32,1008,10,2,2.99,0,5.98),
(33,1008,13,1,1.29,0,1.29),
(34,1008,15,3,0.99,0,2.97),
(35,1009,1,1,5.99,0,5.99),
(36,1009,18,1,12.99,0,12.99),
(37,1009,19,1,7.99,0,7.99),
(38,1009,20,1,13.99,0,13.99),
(39,1010,11,2,1.99,0,3.98),
(40,1010,12,3,4.99,0,14.97),
(41,1010,13,2,1.29,0,2.58),
(42,1010,14,1,6.99,0,6.99),
(43,1011,1,2,5.99,0,11.98),
(44,1011,18,2,12.99,0,25.98),
(45,1011,20,1,13.99,0,13.99),
(46,1011,21,1,8.99,10,8.09),
(47,1012,5,4,5.49,0,21.96),
(48,1012,6,1,6.49,0,6.49),
(49,1012,7,2,4.99,0,9.98),
(50,1012,9,2,5.99,0,11.98),
(51,1012,10,1,2.99,0,2.99),
(52,1012,15,5,0.99,0,4.95),
(53,1013,2,2,8.99,0,17.98),
(54,1013,4,1,2.99,0,2.99),
(55,1013,17,5,5.99,0,29.95),
(56,1014,16,2,5.49,0,10.98),
(57,1014,15,5,0.99,0,4.95),
(58,1015,1,1,5.99,0,5.99),
(59,1015,20,1,13.99,0,13.99),
(60,1015,21,1,8.99,10,8.09),
(61,1016,5,6,5.49,0,32.94),
(62,1016,10,2,2.99,0,5.98),
(63,1016,11,1,1.99,0,1.99),
(64,1016,13,2,1.29,0,2.58),
(65,1017,1,2,5.99,0,11.98),
(66,1017,2,4,8.99,0,35.96),
(67,1017,20,2,13.99,0,27.98),
(68,1017,21,2,8.99,10,16.18),
(69,1018,5,4,5.49,0,21.96),
(70,1018,7,2,4.99,0,9.98),
(71,1018,8,2,5.99,0,11.98),
(72,1018,9,2,5.99,0,11.98),
(73,1018,14,1,6.99,0,6.99),
(74,1019,22,2,4.49,0,8.98),
(75,1019,15,4,0.99,0,3.96),
(76,1020,1,1,5.99,0,5.99),
(77,1020,18,2,12.99,0,25.98),
(78,1020,16,1,5.49,0,5.49),
(79,1020,19,2,7.99,0,15.98),
(80,1021,2,1,8.99,0,8.99),
(81,1021,5,4,5.49,0,21.96),
(82,1021,9,1,5.99,0,5.99),
(83,1021,13,2,1.29,0,2.58),
(84,1022,1,2,5.99,0,11.98),
(85,1022,20,1,13.99,0,13.99),
(86,1022,21,1,8.99,10,8.09),
(87,1022,23,1,13.99,0,13.99),
(88,1023,2,2,8.99,0,17.98),
(89,1023,18,1,12.99,0,12.99),
(90,1023,19,2,7.99,0,15.98),
(91,1024,14,2,6.99,0,13.98),
(92,1024,13,1,1.29,0,1.29),
(93,1025,1,2,5.99,0,11.98),
(94,1025,20,1,13.99,0,13.99),
(95,1025,21,2,8.99,10,16.18),
(96,1025,16,1,5.49,0,5.49),
(97,1025,19,1,7.99,0,7.99),
(98,1026,2,1,8.99,0,8.99),
(99,1026,4,2,2.99,0,5.98),
(100,1026,15,5,0.99,0,4.95),
(101,1026,17,5,5.99,0,29.95),
(102,1027,1,1,5.99,0,5.99),
(103,1027,18,2,12.99,0,25.98),
(104,1027,16,1,5.49,0,5.49),
(105,1027,15,3,0.99,0,2.97),
(106,1028,1,2,5.99,0,11.98),
(107,1028,20,1,13.99,0,13.99),
(108,1028,21,1,8.99,10,8.09),
(109,1028,23,1,13.99,0,13.99),
(110,1028,19,1,7.99,0,7.99),
(111,1029,1,2,5.99,0,11.98),
(112,1029,2,2,8.99,0,17.98),
(113,1029,20,2,13.99,0,27.98),
(114,1029,21,2,8.99,10,16.18),
(115,1030,5,4,5.49,0,21.96),
(116,1030,7,2,4.99,0,9.98),
(117,1030,9,1,5.99,0,5.99),
(118,1030,10,2,2.99,0,5.98);
`;

// ─── Schema metadata (used by the playground's schema sidebar) ────────────────
export const SQL_TABLES = [
  {
    name: 'customers',
    color: '#06b6d4',
    rowCount: 20,
    columns: [
      { name: 'customer_id', type: 'INTEGER', note: 'Primary Key' },
      { name: 'first_name',  type: 'VARCHAR' },
      { name: 'last_name',   type: 'VARCHAR' },
      { name: 'email',       type: 'VARCHAR' },
      { name: 'phone',       type: 'VARCHAR' },
      { name: 'city',        type: 'VARCHAR' },
      { name: 'state',       type: 'VARCHAR' },
      { name: 'zip_code',    type: 'VARCHAR' },
      { name: 'joined_date', type: 'DATE' },
      { name: 'loyalty_tier',type: 'VARCHAR', note: 'Bronze/Silver/Gold/Platinum' },
    ],
  },
  {
    name: 'orders',
    color: '#f97316',
    rowCount: 30,
    columns: [
      { name: 'order_id',       type: 'INTEGER', note: 'Primary Key' },
      { name: 'customer_id',    type: 'INTEGER', note: 'FK → customers' },
      { name: 'store_id',       type: 'VARCHAR', note: 'FK → stores' },
      { name: 'order_date',     type: 'DATE' },
      { name: 'delivery_date',  type: 'DATE', note: 'NULL if not delivered' },
      { name: 'order_status',   type: 'VARCHAR', note: 'Delivered/Processing/Cancelled/Returned' },
      { name: 'payment_method', type: 'VARCHAR', note: 'Credit Card/Debit Card/Apple Pay/Cash' },
      { name: 'total_amount',   type: 'DECIMAL' },
    ],
  },
  {
    name: 'order_items',
    color: '#8b5cf6',
    rowCount: 118,
    columns: [
      { name: 'item_id',      type: 'INTEGER', note: 'Primary Key' },
      { name: 'order_id',     type: 'INTEGER', note: 'FK → orders' },
      { name: 'product_id',   type: 'INTEGER', note: 'FK → products' },
      { name: 'quantity',     type: 'INTEGER' },
      { name: 'unit_price',   type: 'DECIMAL' },
      { name: 'discount_pct', type: 'DECIMAL', note: 'e.g. 10 = 10% off' },
      { name: 'line_total',   type: 'DECIMAL' },
    ],
  },
  {
    name: 'products',
    color: '#10b981',
    rowCount: 25,
    columns: [
      { name: 'product_id',   type: 'INTEGER', note: 'Primary Key' },
      { name: 'product_name', type: 'VARCHAR' },
      { name: 'category',     type: 'VARCHAR', note: 'Staples/Dairy/Beverages/…' },
      { name: 'sub_category', type: 'VARCHAR' },
      { name: 'brand',        type: 'VARCHAR' },
      { name: 'unit_price',   type: 'DECIMAL' },
      { name: 'cost_price',   type: 'DECIMAL' },
      { name: 'unit',         type: 'VARCHAR', note: 'lb/oz/gallon/dozen/piece' },
      { name: 'in_stock',     type: 'BOOLEAN' },
    ],
  },
  {
    name: 'stores',
    color: '#0078d4',
    rowCount: 10,
    columns: [
      { name: 'store_id',       type: 'VARCHAR', note: 'Primary Key (ST001–ST010)' },
      { name: 'store_name',     type: 'VARCHAR' },
      { name: 'city',           type: 'VARCHAR' },
      { name: 'state',          type: 'VARCHAR' },
      { name: 'manager_name',   type: 'VARCHAR' },
      { name: 'opened_date',    type: 'DATE' },
      { name: 'monthly_target', type: 'DECIMAL', note: 'USD' },
    ],
  },
  {
    name: 'employees',
    color: '#f59e0b',
    rowCount: 15,
    columns: [
      { name: 'employee_id', type: 'INTEGER', note: 'Primary Key' },
      { name: 'first_name',  type: 'VARCHAR' },
      { name: 'last_name',   type: 'VARCHAR' },
      { name: 'role',        type: 'VARCHAR' },
      { name: 'department',  type: 'VARCHAR' },
      { name: 'store_id',    type: 'VARCHAR', note: 'FK → stores' },
      { name: 'salary',      type: 'DECIMAL', note: 'Annual USD' },
      { name: 'hire_date',   type: 'DATE' },
      { name: 'manager_id',  type: 'INTEGER', note: 'FK → employees (self)' },
    ],
  },
];

// ─── Backwards-compatible aliases (used by SQLPlayground) ─────────────────────
export const FRESHMART_SCHEMA_SQL = FRESHCART_SCHEMA_SQL;
export const FRESHMART_SEED_SQL   = FRESHCART_SEED_SQL;

// ─── Full curriculum map ──────────────────────────────────────────────────────
export type ModuleStatus = 'live' | 'coming-soon';

export interface SQLModule {
  id: number;
  slug: string;
  title: string;
  description: string;
  tags: string[];
  status: ModuleStatus;
  readTime: string;
}

export interface SQLSection {
  id: number;
  title: string;
  color: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  modules: SQLModule[];
}

export const SQL_CURRICULUM: SQLSection[] = [
  {
    id: 1, title: 'Databases & Setup', color: '#10b981', difficulty: 'Beginner',
    modules: [
      { id: 1,  slug: 'what-is-a-database',      title: 'What is a Database?',                       description: 'Why spreadsheets fail at scale — and what databases do instead',       tags: ['Excel vs database','Why databases exist','Real-world scale','FreshCart intro'],                                                      status: 'live',        readTime: '8–12 min'  },
      { id: 2,  slug: 'how-databases-work',       title: 'How Databases Work',                        description: 'Tables, rows, columns, keys — the building blocks explained simply',  tags: ['Tables & rows','Columns','Primary keys','Foreign keys'],                                                                               status: 'live', readTime: '10–14 min' },
      { id: 3,  slug: 'types-of-databases',       title: 'Types of Databases',                        description: 'Relational vs NoSQL — which one to use and when',                    tags: ['Relational','NoSQL','Document stores','When to use each'],                                                                            status: 'live', readTime: '8–12 min'  },
      { id: 4,  slug: 'setting-up',               title: 'Setting Up Your Environment',               description: 'Install MySQL or PostgreSQL, or use the browser playground',          tags: ['MySQL setup','PostgreSQL','Browser playground','First connection'],                                                                    status: 'live', readTime: '10–16 min' },
    ],
  },
  {
    id: 2, title: 'Reading Data — SELECT', color: '#06b6d4', difficulty: 'Beginner',
    modules: [
      { id: 5,  slug: 'select-from',              title: 'Your First Query — SELECT & FROM',          description: 'The two most important words in SQL',                               tags: ['SELECT','FROM','Reading columns','Basic syntax'],                                                                                     status: 'live', readTime: '10–14 min' },
      { id: 6,  slug: 'where-clause',             title: 'Filtering Rows — WHERE Clause',             description: 'Get only the rows you actually need',                              tags: ['WHERE','Equality filter','Comparison operators','Filtering rows'],                                                                     status: 'live', readTime: '12–16 min' },
      { id: 7,  slug: 'and-or-not',               title: 'Multiple Conditions — AND, OR, NOT',        description: 'Combine filters to answer complex questions',                       tags: ['AND','OR','NOT','Combining conditions'],                                                                                              status: 'live', readTime: '10–14 min' },
      { id: 8,  slug: 'order-by',                 title: 'Sorting Results — ORDER BY',                description: 'Control the order your rows come back in',                          tags: ['ORDER BY','ASC','DESC','Multi-column sort'],                                                                                          status: 'live', readTime: '8–12 min'  },
      { id: 9,  slug: 'limit-fetch',              title: 'Limiting Results — LIMIT / TOP / FETCH',    description: 'Only get the rows you need — critical for performance',             tags: ['LIMIT','TOP','FETCH NEXT','Pagination basics'],                                                                                       status: 'live', readTime: '8–12 min'  },
      { id: 10, slug: 'distinct',                 title: 'Removing Duplicates — DISTINCT',            description: 'See only unique values in your results',                           tags: ['DISTINCT','Unique values','Deduplication','COUNT DISTINCT'],                                                                          status: 'live', readTime: '7–10 min'  },
      { id: 11, slug: 'null-values',              title: 'Working with NULL Values',                  description: 'NULL is not zero, not empty — it is the absence of data',          tags: ['NULL','IS NULL','IS NOT NULL','COALESCE','NULLIF'],                                                                                   status: 'live', readTime: '12–16 min' },
      { id: 12, slug: 'arithmetic-expressions',   title: 'Column Calculations — Arithmetic',          description: 'Do math directly inside your SQL query',                           tags: ['Arithmetic','Expressions','Price calculations','Derived columns'],                                                                    status: 'live', readTime: '8–12 min'  },
      { id: 13, slug: 'aliases',                  title: 'Renaming Columns — AS (Aliases)',           description: 'Give columns and tables readable names',                           tags: ['AS','Column alias','Table alias','Readability'],                                                                                      status: 'live', readTime: '7–10 min'  },
      { id: 14, slug: 'like-wildcards',           title: 'Pattern Matching — LIKE & Wildcards',       description: 'Find rows that match a pattern, not an exact value',               tags: ['LIKE','%  wildcard','_ wildcard','Pattern search'],                                                                                   status: 'live', readTime: '10–14 min' },
    ],
  },
  {
    id: 3, title: 'Filtering & Logic', color: '#f97316', difficulty: 'Beginner',
    modules: [
      { id: 15, slug: 'in-between',               title: 'IN and BETWEEN Operators',                  description: 'Shorthand for multiple OR conditions and range checks',            tags: ['IN','NOT IN','BETWEEN','Range filters'],                                                                                              status: 'live', readTime: '8–12 min'  },
      { id: 16, slug: 'case-when',                title: 'CASE WHEN — Conditional Logic',             description: 'The SQL equivalent of an if-else statement',                       tags: ['CASE WHEN','THEN','ELSE','Conditional columns'],                                                                                      status: 'live', readTime: '12–16 min' },
      { id: 17, slug: 'complex-where',            title: 'Complex WHERE — Combining Conditions',      description: 'Mastering brackets, precedence, and complex filters',               tags: ['Brackets','Precedence','AND vs OR','Complex logic'],                                                                                  status: 'live', readTime: '10–14 min' },
    ],
  },
  {
    id: 4, title: 'Writing & Changing Data', color: '#ef4444', difficulty: 'Beginner',
    modules: [
      { id: 18, slug: 'data-types',               title: 'Data Types in SQL',                         description: 'INT, VARCHAR, DATE, BOOLEAN, DECIMAL — choosing the right type',  tags: ['INT','VARCHAR','DATE','BOOLEAN','DECIMAL','Choosing types'],                                                                          status: 'live', readTime: '12–16 min' },
      { id: 19, slug: 'create-table',             title: 'Creating Tables — CREATE TABLE',            description: 'Design and build your first database table',                       tags: ['CREATE TABLE','Column definitions','Data types','Table structure'],                                                                    status: 'live', readTime: '14–18 min' },
      { id: 20, slug: 'insert-into',              title: 'Adding Data — INSERT INTO',                 description: 'Put data into your tables, one row or many at once',               tags: ['INSERT INTO','VALUES','Bulk insert','Multi-row insert'],                                                                              status: 'live', readTime: '10–14 min' },
      { id: 21, slug: 'update',                   title: 'Updating Data — UPDATE',                    description: 'Change existing rows safely — the WHERE matters more than ever',   tags: ['UPDATE','SET','WHERE on UPDATE','Safe updates'],                                                                                      status: 'live', readTime: '10–14 min' },
      { id: 22, slug: 'delete',                   title: 'Deleting Data — DELETE',                    description: 'Remove rows — and why you should always double-check first',      tags: ['DELETE','WHERE on DELETE','Soft delete','Dangerous without WHERE'],                                                                    status: 'live', readTime: '10–14 min' },
    ],
  },
  {
    id: 5, title: 'Database Design', color: '#8b5cf6', difficulty: 'Intermediate',
    modules: [
      { id: 23, slug: 'constraints',              title: 'Constraints — Rules for Your Data',         description: 'PRIMARY KEY, FOREIGN KEY, NOT NULL, UNIQUE, DEFAULT, CHECK',      tags: ['PRIMARY KEY','FOREIGN KEY','NOT NULL','UNIQUE','DEFAULT','CHECK'],                                                                    status: 'live', readTime: '16–22 min' },
      { id: 24, slug: 'alter-table',              title: 'Changing Structure — ALTER TABLE',          description: 'Add, remove, or rename columns in an existing table',              tags: ['ALTER TABLE','ADD COLUMN','DROP COLUMN','RENAME'],                                                                                    status: 'live', readTime: '10–14 min' },
      { id: 25, slug: 'drop-truncate',            title: 'DROP & TRUNCATE — Removing Tables',         description: 'The difference between deleting data and deleting structure',      tags: ['DROP TABLE','TRUNCATE','DELETE vs TRUNCATE','Irreversible ops'],                                                                      status: 'live', readTime: '8–12 min'  },
      { id: 26, slug: 'normalization',            title: 'Normalization & ER Diagrams',               description: '1NF, 2NF, 3NF — designing tables that make sense',                tags: ['1NF','2NF','3NF','ER diagrams','Good table design'],                                                                                  status: 'live', readTime: '20–26 min' },
    ],
  },
  {
    id: 6, title: 'Aggregation', color: '#10b981', difficulty: 'Intermediate',
    modules: [
      { id: 27, slug: 'aggregate-functions',      title: 'Aggregate Functions',                       description: 'COUNT, SUM, AVG, MIN, MAX — summarize your data',                 tags: ['COUNT','SUM','AVG','MIN','MAX','Summarizing data'],                                                                                   status: 'live', readTime: '12–16 min' },
      { id: 28, slug: 'group-by',                 title: 'Grouping Data — GROUP BY',                  description: 'The most powerful tool for data analysis in SQL',                  tags: ['GROUP BY','Grouping rows','Aggregate per group','Analysis patterns'],                                                                 status: 'live', readTime: '14–18 min' },
      { id: 29, slug: 'having',                   title: 'Filtering Groups — HAVING',                 description: 'Filter after grouping — not the same as WHERE',                   tags: ['HAVING','Filter groups','HAVING vs WHERE','Post-aggregation filter'],                                                                 status: 'live', readTime: '10–14 min' },
    ],
  },
  {
    id: 7, title: 'Joins', color: '#06b6d4', difficulty: 'Intermediate',
    modules: [
      { id: 30, slug: 'joins-intro',              title: 'Introduction to Joins',                     description: 'Why data lives in multiple tables and how to combine it',          tags: ['Why joins exist','Relational model','Join concept','ON clause'],                                                                      status: 'live', readTime: '12–16 min' },
      { id: 31, slug: 'inner-join',               title: 'INNER JOIN — Only Matching Rows',           description: 'The most common join — rows that exist in both tables',            tags: ['INNER JOIN','Matching rows','ON condition','Most used join'],                                                                         status: 'live', readTime: '14–18 min' },
      { id: 32, slug: 'left-right-join',          title: 'LEFT JOIN & RIGHT JOIN',                    description: 'Keep all rows from one side, even without a match',               tags: ['LEFT JOIN','RIGHT JOIN','NULL in joins','Unmatched rows'],                                                                            status: 'live', readTime: '14–20 min' },
      { id: 33, slug: 'full-outer-join',          title: 'FULL OUTER JOIN',                           description: 'All rows from both tables — matched or not',                       tags: ['FULL OUTER JOIN','All rows','Both sides','NULL filling'],                                                                             status: 'live', readTime: '10–14 min' },
      { id: 34, slug: 'self-join',                title: 'SELF JOIN — A Table Joining Itself',        description: 'The trick behind org charts and manager hierarchies',              tags: ['SELF JOIN','Hierarchy','Manager-employee','Recursive relation'],                                                                      status: 'live', readTime: '12–16 min' },
      { id: 35, slug: 'cross-join',               title: 'CROSS JOIN — Every Combination',            description: 'Every row paired with every other row — use with care',           tags: ['CROSS JOIN','Cartesian product','All combinations','Use cases'],                                                                      status: 'live', readTime: '8–12 min'  },
    ],
  },
  {
    id: 8, title: 'Subqueries & Set Operations', color: '#ec4899', difficulty: 'Intermediate',
    modules: [
      { id: 36, slug: 'subqueries',               title: 'Subqueries — Queries Inside Queries',       description: 'Use the result of one query inside another',                       tags: ['Subquery','Nested query','Subquery in WHERE','Subquery in SELECT'],                                                                   status: 'live', readTime: '14–20 min' },
      { id: 37, slug: 'correlated-subqueries',    title: 'Correlated Subqueries',                     description: 'Subqueries that reference the outer query — row by row',           tags: ['Correlated','Outer query reference','Row-by-row','Performance impact'],                                                               status: 'live', readTime: '14–20 min' },
      { id: 38, slug: 'exists-not-exists',        title: 'EXISTS & NOT EXISTS',                       description: 'Check if any matching rows exist — faster than IN for large sets', tags: ['EXISTS','NOT EXISTS','Existence check','vs IN operator'],                                                                             status: 'live', readTime: '12–16 min' },
      { id: 39, slug: 'union-intersect-except',   title: 'UNION, INTERSECT, EXCEPT',                  description: 'Combine or compare results from multiple queries',                 tags: ['UNION','UNION ALL','INTERSECT','EXCEPT','Set operations'],                                                                            status: 'live', readTime: '12–16 min' },
      { id: 40, slug: 'derived-tables',           title: 'Derived Tables — Subquery in FROM',         description: 'Treat a query result as a temporary table',                        tags: ['Derived table','Subquery in FROM','Inline view','Temporary result'],                                                                  status: 'live', readTime: '10–14 min' },
    ],
  },
  {
    id: 9, title: 'SQL Functions', color: '#f59e0b', difficulty: 'Intermediate',
    modules: [
      { id: 41, slug: 'string-functions',         title: 'String Functions',                          description: 'UPPER, LOWER, CONCAT, LENGTH, TRIM, REPLACE, SUBSTRING',         tags: ['UPPER','LOWER','CONCAT','TRIM','SUBSTRING','REPLACE'],                                                                                status: 'live', readTime: '14–18 min' },
      { id: 42, slug: 'date-time-functions',      title: 'Date & Time Functions',                     description: 'NOW, DATEDIFF, DATE_FORMAT — work with dates like a pro',         tags: ['NOW','DATEDIFF','DATE_FORMAT','DATEPART','Date arithmetic'],                                                                          status: 'live', readTime: '14–18 min' },
      { id: 43, slug: 'math-functions',           title: 'Math Functions',                            description: 'ROUND, FLOOR, CEIL, ABS, MOD — math inside SQL',                 tags: ['ROUND','FLOOR','CEILING','ABS','MOD','Math in queries'],                                                                              status: 'live', readTime: '10–14 min' },
      { id: 44, slug: 'cast-convert',             title: 'Type Conversion — CAST & CONVERT',          description: 'Change a column\'s data type on the fly',                          tags: ['CAST','CONVERT','Type conversion','Implicit vs explicit'],                                                                            status: 'live', readTime: '10–14 min' },
    ],
  },
  {
    id: 10, title: 'Advanced SQL Objects', color: '#ef4444', difficulty: 'Intermediate',
    modules: [
      { id: 45, slug: 'views',                    title: 'Views — Virtual Tables',                    description: 'Save a query as a named view — query it like a table',            tags: ['CREATE VIEW','Virtual table','Updatable views','View use cases'],                                                                     status: 'live', readTime: '12–16 min' },
      { id: 46, slug: 'indexes',                  title: 'Indexes — Making Queries Fast',             description: 'The single most impactful performance tool in SQL',                tags: ['CREATE INDEX','B-tree index','Composite index','When to index'],                                                                      status: 'live', readTime: '14–20 min' },
      { id: 47, slug: 'transactions',             title: 'Transactions — COMMIT & ROLLBACK',          description: 'Group queries into all-or-nothing operations',                     tags: ['BEGIN','COMMIT','ROLLBACK','SAVEPOINT','Atomicity'],                                                                                  status: 'live', readTime: '12–16 min' },
      { id: 48, slug: 'acid-properties',          title: 'ACID Properties',                           description: 'The 4 rules every reliable database follows',                      tags: ['Atomicity','Consistency','Isolation','Durability','Why ACID matters'],                                                                status: 'live', readTime: '14–18 min' },
      { id: 49, slug: 'stored-procedures',        title: 'Stored Procedures',                         description: 'Save and reuse complex SQL logic on the server',                   tags: ['CREATE PROCEDURE','Parameters','CALL','Reusable logic'],                                                                              status: 'live', readTime: '14–20 min' },
      { id: 50, slug: 'user-defined-functions',   title: 'User-Defined Functions',                    description: 'Build your own SQL functions for repeated logic',                  tags: ['CREATE FUNCTION','Scalar UDF','Table-valued UDF','RETURNS'],                                                                          status: 'live', readTime: '12–18 min' },
      { id: 51, slug: 'triggers',                 title: 'Triggers — Auto-Run on Events',             description: 'SQL that runs automatically when data changes',                    tags: ['CREATE TRIGGER','BEFORE / AFTER','INSERT / UPDATE / DELETE','Audit logs'],                                                            status: 'live', readTime: '14–18 min' },
    ],
  },
  {
    id: 11, title: 'Window Functions & CTEs', color: '#8b5cf6', difficulty: 'Advanced',
    modules: [
      { id: 52, slug: 'window-functions-intro',   title: 'Window Functions — OVER & PARTITION BY',    description: 'Aggregate without collapsing rows — the most powerful SQL feature', tags: ['OVER','PARTITION BY','Window frame','No GROUP BY collapse'],                                                                         status: 'live', readTime: '16–22 min' },
      { id: 53, slug: 'ranking-functions',        title: 'Ranking — ROW_NUMBER, RANK, DENSE_RANK',    description: 'Rank rows within groups — critical for interview questions',        tags: ['ROW_NUMBER','RANK','DENSE_RANK','NTILE','Ranking patterns'],                                                                         status: 'live', readTime: '14–20 min' },
      { id: 54, slug: 'analytics-lag-lead',       title: 'LAG, LEAD, FIRST_VALUE, LAST_VALUE',        description: 'Access other rows\' values from the current row',                  tags: ['LAG','LEAD','FIRST_VALUE','LAST_VALUE','Row comparison'],                                                                             status: 'live', readTime: '14–20 min' },
      { id: 55, slug: 'cte-with-clause',          title: 'CTEs — WITH Clause',                        description: 'Write readable, layered queries with Common Table Expressions',    tags: ['WITH','CTE','Named subquery','Multiple CTEs','Readability'],                                                                          status: 'live', readTime: '14–20 min' },
      { id: 56, slug: 'recursive-cte',            title: 'Recursive CTEs — Hierarchies & Trees',      description: 'Query parent-child relationships with recursive queries',           tags: ['RECURSIVE','Hierarchy','Tree traversal','UNION ALL in CTE'],                                                                         status: 'live', readTime: '16–24 min' },
    ],
  },
  {
    id: 12, title: 'Performance & Optimization', color: '#10b981', difficulty: 'Advanced',
    modules: [
      { id: 57, slug: 'explain-analyze',          title: 'EXPLAIN & EXPLAIN ANALYZE',                 description: 'Read the query execution plan — know why a query is slow',         tags: ['EXPLAIN','Query plan','Seq scan vs index scan','Execution cost'],                                                                     status: 'live', readTime: '14–20 min' },
      { id: 58, slug: 'index-strategies',         title: 'Index Strategies',                          description: 'Composite indexes, covering indexes, when NOT to index',           tags: ['Composite index','Covering index','Index selectivity','When to avoid'],                                                               status: 'live', readTime: '14–20 min' },
      { id: 59, slug: 'query-best-practices',     title: 'Query Best Practices',                      description: 'Write clean, fast, readable SQL your team will thank you for',     tags: ['SELECT *  avoid','SARGability','Avoid functions on indexed cols','Clean SQL'],                                                        status: 'live', readTime: '14–18 min' },
    ],
  },
  {
    id: 13, title: 'Real-World & Interview', color: '#06b6d4', difficulty: 'Advanced',
    modules: [
      { id: 60, slug: 'sql-for-data-analysis',    title: 'SQL for Data Analysis',                     description: 'Real case studies — revenue intelligence, cohort analysis, RFM segmentation', tags: ['Revenue analysis','Cohort analysis','RFM','FreshCart full query'],                                                              status: 'live', readTime: '28–36 min' },
      { id: 61, slug: 'interview-questions',      title: 'Top 50 SQL Interview Questions',            description: 'Every question with full explanation, query, and common traps',     tags: ['Window fn questions','Join questions','CTE questions','Tricky NULLs','50 answers'],                                                   status: 'live', readTime: '55–70 min' },
      { id: 62, slug: 'sql-projects',             title: '3 Real SQL Projects',                       description: 'Build a full database, write analysis queries, present results',   tags: ['FreshCart project','E-commerce DB','Analytics dashboard','End to end'],                                                               status: 'live', readTime: '80–100 min' },
    ],
  },
];
