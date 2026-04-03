// ─────────────────────────────────────────────────────────────────────────────
// FreshMart SQL Database
// Fictional grocery chain · 10 stores across India · Used across all SQL modules
// ─────────────────────────────────────────────────────────────────────────────

export const FRESHMART_SCHEMA_SQL = `
CREATE TABLE IF NOT EXISTS stores (
  store_id    VARCHAR PRIMARY KEY,
  store_name  VARCHAR,
  city        VARCHAR,
  state       VARCHAR,
  manager_name VARCHAR,
  opened_date DATE,
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
  pincode      VARCHAR,
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

export const FRESHMART_SEED_SQL = `
INSERT INTO stores VALUES
('ST001','FreshMart Koramangala','Bangalore','Karnataka','Priya Sharma','2020-01-15',2500000),
('ST002','FreshMart Whitefield','Bangalore','Karnataka','Rajesh Kumar','2020-06-10',2200000),
('ST003','FreshMart Banjara Hills','Hyderabad','Telangana','Anita Reddy','2019-11-20',1800000),
('ST004','FreshMart HITEC City','Hyderabad','Telangana','Suresh Rao','2021-03-05',2100000),
('ST005','FreshMart Andheri','Mumbai','Maharashtra','Meera Patel','2019-08-12',3200000),
('ST006','FreshMart Powai','Mumbai','Maharashtra','Vikram Shah','2020-09-22',2800000),
('ST007','FreshMart Kothrud','Pune','Maharashtra','Deepa Joshi','2021-01-18',1600000),
('ST008','FreshMart Connaught Place','Delhi','Delhi','Amit Gupta','2019-05-30',3500000),
('ST009','FreshMart Anna Nagar','Chennai','Tamil Nadu','Kavitha Rajan','2020-11-08',1900000),
('ST010','FreshMart CG Road','Ahmedabad','Gujarat','Nirav Mehta','2021-07-14',1400000);

INSERT INTO customers VALUES
(1,'Aisha','Khan','aisha.khan@gmail.com','9876543210','Bangalore','Karnataka','560034','2022-03-15','Gold'),
(2,'Ravi','Kumar','ravi.kumar@outlook.com','9123456789','Hyderabad','Telangana','500034','2021-07-22','Silver'),
(3,'Priya','Sharma','priya.sharma@yahoo.com','9988776655','Mumbai','Maharashtra','400053','2023-01-10','Bronze'),
(4,'Arjun','Patel','arjun.patel@gmail.com','9871234567','Ahmedabad','Gujarat','380009','2022-11-05','Platinum'),
(5,'Meera','Nair','meera.nair@gmail.com','9765432109','Bangalore','Karnataka','560047','2021-05-18','Gold'),
(6,'Suresh','Reddy','suresh.reddy@hotmail.com','9654321098','Hyderabad','Telangana','500072','2023-06-30','Bronze'),
(7,'Divya','Singh','divya.singh@gmail.com','9543210987','Delhi','Delhi','110001','2020-09-14','Platinum'),
(8,'Karthik','Raj','karthik.raj@gmail.com','9432109876','Chennai','Tamil Nadu','600040','2022-04-27','Silver'),
(9,'Ananya','Gupta','ananya.gupta@gmail.com','9321098765','Delhi','Delhi','110016','2021-12-03','Gold'),
(10,'Rohit','Joshi','rohit.joshi@gmail.com','9210987654','Pune','Maharashtra','411038','2023-02-19','Bronze'),
(11,'Lakshmi','Iyer','lakshmi.iyer@gmail.com','9109876543','Chennai','Tamil Nadu','600023','2020-07-08','Platinum'),
(12,'Farhan','Sheikh','farhan.sheikh@gmail.com','9098765432','Mumbai','Maharashtra','400070','2022-08-16','Silver'),
(13,'Sneha','Kulkarni','sneha.kulkarni@gmail.com','9987654321','Pune','Maharashtra','411004','2021-10-29','Gold'),
(14,'Vijay','Menon','vijay.menon@gmail.com','9876543219','Bangalore','Karnataka','560001','2023-03-07','Bronze'),
(15,'Neha','Agarwal','neha.agarwal@gmail.com','9765432198','Delhi','Delhi','110059','2022-01-25','Gold'),
(16,'Sanjay','Verma','sanjay.verma@gmail.com','9654321987','Bangalore','Karnataka','560078','2020-11-12','Platinum'),
(17,'Pooja','Mishra','pooja.mishra@gmail.com','9543219876','Hyderabad','Telangana','500081','2023-07-20','Bronze'),
(18,'Rahul','Das','rahul.das@gmail.com','9432198765','Bangalore','Karnataka','560025','2021-04-11','Silver'),
(19,'Kavya','Pillai','kavya.pillai@gmail.com','9321987654','Chennai','Tamil Nadu','600028','2022-09-03','Gold'),
(20,'Amitabh','Tiwari','amitabh.tiwari@gmail.com','9210876543','Delhi','Delhi','110030','2021-03-22','Silver');

INSERT INTO employees VALUES
(1,'Priya','Sharma','Store Manager','Management','ST001',65000,'2019-12-01',NULL),
(2,'Rahul','Verma','Assistant Manager','Management','ST001',42000,'2020-02-15',1),
(3,'Sunita','Kapoor','Cashier','Operations','ST001',22000,'2020-06-01',2),
(4,'Manu','Tiwari','Cashier','Operations','ST001',22000,'2021-01-10',2),
(5,'Rajesh','Kumar','Store Manager','Management','ST002',68000,'2020-05-01',NULL),
(6,'Asha','Mehta','Assistant Manager','Management','ST002',43000,'2020-07-20',5),
(7,'Dev','Singh','Stock Supervisor','Operations','ST002',28000,'2021-03-15',6),
(8,'Anita','Reddy','Store Manager','Management','ST003',62000,'2019-10-01',NULL),
(9,'Ramu','Krishnan','Cashier','Operations','ST003',21000,'2020-08-01',8),
(10,'Suresh','Rao','Store Manager','Management','ST004',67000,'2021-02-01',NULL),
(11,'Meera','Patel','Store Manager','Management','ST005',75000,'2019-07-01',NULL),
(12,'Nikhil','Shah','Assistant Manager','Management','ST005',48000,'2019-09-15',11),
(13,'Kavitha','Rajan','Store Manager','Management','ST009',61000,'2020-10-01',NULL),
(14,'Nirav','Mehta','Store Manager','Management','ST010',58000,'2021-06-01',NULL),
(15,'Amit','Gupta','Store Manager','Management','ST008',72000,'2019-04-01',NULL);

INSERT INTO products VALUES
(1,'Aashirvaad Atta','Staples','Flour','Aashirvaad',340,260,'5kg',true),
(2,'India Gate Basmati Rice','Staples','Rice','India Gate',210,160,'1kg',true),
(3,'Tata Sampann Toor Dal','Staples','Dal','Tata',145,110,'500g',true),
(4,'Tata Salt','Staples','Salt','Tata',22,16,'1kg',true),
(5,'Amul Taaza Milk','Dairy','Milk','Amul',28,22,'500ml',true),
(6,'Amul Butter','Dairy','Butter','Amul',56,44,'100g',true),
(7,'Amul Fresh Paneer','Dairy','Paneer','Amul',80,62,'200g',true),
(8,'Britannia Bread','Bakery','Bread','Britannia',45,34,'piece',true),
(9,'Eggs (Dozen)','Dairy','Eggs','Nandus',96,72,'dozen',true),
(10,'Tomatoes','Vegetables','Tomatoes','Local',40,28,'500g',true),
(11,'Onions','Vegetables','Onions','Local',30,20,'1kg',true),
(12,'Potatoes','Vegetables','Potatoes','Local',35,24,'1kg',true),
(13,'Bananas','Fruits','Bananas','Local',40,28,'dozen',true),
(14,'Shimla Apples','Fruits','Apples','Local',120,88,'1kg',true),
(15,'Maggi Noodles','Packaged Food','Noodles','Nestle',14,10,'70g',true),
(16,'Quaker Oats','Packaged Food','Oats','Quaker',110,84,'500g',true),
(17,'Parle-G Biscuits','Packaged Food','Biscuits','Parle',10,7,'100g',true),
(18,'Fortune Sunflower Oil','Staples','Oil','Fortune',145,112,'1L',true),
(19,'Tata Tea Gold','Beverages','Tea','Tata',115,88,'250g',true),
(20,'Nescafe Classic','Beverages','Coffee','Nestle',270,210,'100g',true),
(21,'Head & Shoulders Shampoo','Personal Care','Shampoo','P&G',349,270,'340ml',true),
(22,'Dove Soap','Personal Care','Soap','HUL',56,42,'100g',true),
(23,'Surf Excel Detergent','Household','Detergent','HUL',210,162,'1kg',true),
(24,'Bisleri Water','Beverages','Water','Bisleri',20,14,'1L',true),
(25,'Paper Boat Aam Panna','Beverages','Juice','Paper Boat',30,22,'250ml',false);

INSERT INTO orders VALUES
(1001,1,'ST001','2024-01-05','2024-01-07','Delivered','UPI',856),
(1002,2,'ST003','2024-01-08','2024-01-10','Delivered','Card',392),
(1003,3,'ST005','2024-01-10',NULL,'Processing','UPI',245),
(1004,4,'ST010','2024-01-12','2024-01-14','Delivered','COD',1120),
(1005,5,'ST001','2024-01-15','2024-01-17','Delivered','UPI',567),
(1006,6,'ST004','2024-01-18',NULL,'Cancelled','Card',180),
(1007,7,'ST008','2024-01-20','2024-01-22','Delivered','NetBanking',2340),
(1008,8,'ST009','2024-01-22','2024-01-24','Delivered','UPI',445),
(1009,9,'ST008','2024-01-25','2024-01-27','Delivered','UPI',789),
(1010,10,'ST007','2024-01-28','2024-01-30','Returned','Card',350),
(1011,11,'ST009','2024-02-01','2024-02-03','Delivered','UPI',1680),
(1012,12,'ST005','2024-02-03','2024-02-05','Delivered','Card',678),
(1013,13,'ST007','2024-02-06','2024-02-08','Delivered','UPI',490),
(1014,14,'ST001','2024-02-08',NULL,'Processing','UPI',320),
(1015,15,'ST008','2024-02-10','2024-02-12','Delivered','Card',1230),
(1016,1,'ST001','2024-02-14','2024-02-16','Delivered','UPI',445),
(1017,16,'ST001','2024-02-16','2024-02-18','Delivered','NetBanking',3200),
(1018,5,'ST002','2024-02-19','2024-02-21','Delivered','UPI',678),
(1019,17,'ST003','2024-02-22',NULL,'Cancelled','Card',256),
(1020,18,'ST001','2024-02-24','2024-02-26','Delivered','UPI',892),
(1021,19,'ST009','2024-02-27','2024-02-29','Delivered','UPI',567),
(1022,20,'ST008','2024-03-01','2024-03-03','Delivered','Card',1450),
(1023,7,'ST008','2024-03-04','2024-03-06','Delivered','UPI',890),
(1024,9,'ST008','2024-03-07','2024-03-09','Returned','UPI',340),
(1025,11,'ST009','2024-03-10','2024-03-12','Delivered','NetBanking',2100),
(1026,2,'ST003','2024-03-13','2024-03-15','Delivered','UPI',456),
(1027,13,'ST007','2024-03-16','2024-03-18','Delivered','Card',789),
(1028,4,'ST010','2024-03-19','2024-03-21','Delivered','COD',1560),
(1029,16,'ST001','2024-03-22','2024-03-24','Delivered','UPI',2340),
(1030,6,'ST004','2024-03-25',NULL,'Processing','Card',490);

INSERT INTO order_items VALUES
(1,1001,1,2,340,0,680),
(2,1001,5,4,28,0,112),
(3,1001,4,1,22,0,22),
(4,1001,17,4,10,5,38),
(5,1002,2,1,210,0,210),
(6,1002,18,1,145,0,145),
(7,1002,9,1,96,0,96),
(8,1003,7,2,80,0,160),
(9,1003,8,1,45,0,45),
(10,1003,15,2,14,0,28),
(11,1004,1,1,340,0,340),
(12,1004,19,2,115,0,230),
(13,1004,21,1,349,10,314),
(14,1004,23,1,210,0,210),
(15,1005,5,6,28,0,168),
(16,1005,6,2,56,0,112),
(17,1005,10,2,40,0,80),
(18,1005,11,1,30,0,30),
(19,1005,12,1,35,0,35),
(20,1005,13,1,40,0,40),
(21,1006,22,2,56,0,112),
(22,1006,24,3,20,0,60),
(23,1007,1,1,340,0,340),
(24,1007,2,2,210,0,420),
(25,1007,20,1,270,0,270),
(26,1007,21,2,349,10,628),
(27,1007,23,1,210,0,210),
(28,1007,16,1,110,0,110),
(29,1008,5,4,28,0,112),
(30,1008,7,1,80,0,80),
(31,1008,9,1,96,0,96),
(32,1008,10,2,40,0,80),
(33,1008,13,1,40,0,40),
(34,1008,15,3,14,0,42),
(35,1009,1,1,340,0,340),
(36,1009,18,1,145,0,145),
(37,1009,19,1,115,0,115),
(38,1009,20,1,270,0,270),
(39,1010,11,2,30,0,60),
(40,1010,12,3,35,0,105),
(41,1010,13,2,40,0,80),
(42,1010,14,1,120,0,120),
(43,1011,1,2,340,0,680),
(44,1011,18,2,145,0,290),
(45,1011,20,1,270,0,270),
(46,1011,21,1,349,10,314),
(47,1012,5,4,28,0,112),
(48,1012,6,1,56,0,56),
(49,1012,7,2,80,0,160),
(50,1012,9,2,96,0,192),
(51,1012,10,1,40,0,40),
(52,1012,15,5,14,0,70),
(53,1013,2,2,210,0,420),
(54,1013,4,1,22,0,22),
(55,1013,17,5,10,0,50),
(56,1014,16,2,110,0,220),
(57,1014,15,5,14,0,70),
(58,1015,1,1,340,0,340),
(59,1015,20,1,270,0,270),
(60,1015,21,1,349,10,314),
(61,1016,5,6,28,0,168),
(62,1016,10,2,40,0,80),
(63,1016,11,1,30,0,30),
(64,1016,13,2,40,0,80),
(65,1017,1,2,340,0,680),
(66,1017,2,4,210,0,840),
(67,1017,20,2,270,0,540),
(68,1017,21,2,349,10,628),
(69,1018,5,4,28,0,112),
(70,1018,7,2,80,0,160),
(71,1018,8,2,45,0,90),
(72,1018,9,2,96,0,192),
(73,1018,14,1,120,0,120),
(74,1019,22,2,56,0,112),
(75,1019,15,4,14,0,56),
(76,1020,1,1,340,0,340),
(77,1020,18,2,145,0,290),
(78,1020,16,1,110,0,110),
(79,1020,19,2,115,0,230),
(80,1021,2,1,210,0,210),
(81,1021,5,4,28,0,112),
(82,1021,9,1,96,0,96),
(83,1021,13,2,40,0,80),
(84,1022,1,2,340,0,680),
(85,1022,20,1,270,0,270),
(86,1022,21,1,349,10,314),
(87,1022,23,1,210,0,210),
(88,1023,2,2,210,0,420),
(89,1023,18,1,145,0,145),
(90,1023,19,2,115,0,230),
(91,1024,14,2,120,0,240),
(92,1024,13,1,40,0,40),
(93,1025,1,2,340,0,680),
(94,1025,20,1,270,0,270),
(95,1025,21,2,349,10,628),
(96,1025,16,1,110,0,110),
(97,1025,19,1,115,0,115),
(98,1026,2,1,210,0,210),
(99,1026,4,2,22,0,44),
(100,1026,15,5,14,0,70),
(101,1026,17,5,10,0,50),
(102,1027,1,1,340,0,340),
(103,1027,18,2,145,0,290),
(104,1027,16,1,110,0,110),
(105,1027,15,3,14,0,42),
(106,1028,1,2,340,0,680),
(107,1028,20,1,270,0,270),
(108,1028,21,1,349,10,314),
(109,1028,23,1,210,0,210),
(110,1028,19,1,115,0,115),
(111,1029,1,2,340,0,680),
(112,1029,2,2,210,0,420),
(113,1029,20,2,270,0,540),
(114,1029,21,2,349,10,628),
(115,1030,5,4,28,0,112),
(116,1030,7,2,80,0,160),
(117,1030,9,1,96,0,96),
(118,1030,10,2,40,0,80);
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
      { name: 'pincode',     type: 'VARCHAR' },
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
      { name: 'payment_method', type: 'VARCHAR', note: 'UPI/Card/COD/NetBanking' },
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
      { name: 'unit',         type: 'VARCHAR', note: 'kg/litre/piece/pack' },
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
      { name: 'monthly_target', type: 'DECIMAL' },
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
      { name: 'salary',      type: 'DECIMAL' },
      { name: 'hire_date',   type: 'DATE' },
      { name: 'manager_id',  type: 'INTEGER', note: 'FK → employees (self)' },
    ],
  },
];

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
  modules: SQLModule[];
}
export const SQL_CURRICULUM: SQLSection[] = [
  {
    id: 1, title: 'Databases & Setup', color: '#10b981',
    modules: [
      { id: 1,  slug: 'what-is-a-database',      title: 'What is a Database?',                       description: 'Why Excel fails at scale — and what databases do instead',           tags: ['Excel vs database','Why databases exist','Real-world scale','FreshMart intro'],                                                       status: 'live',        readTime: '8 min'  },
      { id: 2,  slug: 'how-databases-work',       title: 'How Databases Work',                        description: 'Tables, rows, columns, keys — the building blocks explained simply',  tags: ['Tables & rows','Columns','Primary keys','Foreign keys'],                                                                               status: 'coming-soon', readTime: '10 min' },
      { id: 3,  slug: 'types-of-databases',       title: 'Types of Databases',                        description: 'Relational vs NoSQL — which one to use and when',                    tags: ['Relational','NoSQL','Document stores','When to use each'],                                                                            status: 'coming-soon', readTime: '8 min'  },
      { id: 4,  slug: 'setting-up',               title: 'Setting Up Your Environment',               description: 'Install MySQL or PostgreSQL, or use the browser playground',          tags: ['MySQL setup','PostgreSQL','Browser playground','First connection'],                                                                    status: 'coming-soon', readTime: '12 min' },
    ],
  },
  {
    id: 2, title: 'Reading Data — SELECT', color: '#06b6d4',
    modules: [
      { id: 5,  slug: 'select-from',              title: 'Your First Query — SELECT & FROM',          description: 'The two most important words in SQL',                               tags: ['SELECT','FROM','Reading columns','Basic syntax'],                                                                                     status: 'coming-soon', readTime: '10 min' },
      { id: 6,  slug: 'where-clause',             title: 'Filtering Rows — WHERE Clause',             description: 'Get only the rows you actually need',                              tags: ['WHERE','Equality filter','Comparison operators','Filtering rows'],                                                                     status: 'coming-soon', readTime: '12 min' },
      { id: 7,  slug: 'and-or-not',               title: 'Multiple Conditions — AND, OR, NOT',        description: 'Combine filters to answer complex questions',                       tags: ['AND','OR','NOT','Combining conditions'],                                                                                              status: 'coming-soon', readTime: '10 min' },
      { id: 8,  slug: 'order-by',                 title: 'Sorting Results — ORDER BY',                description: 'Control the order your rows come back in',                          tags: ['ORDER BY','ASC','DESC','Multi-column sort'],                                                                                          status: 'coming-soon', readTime: '8 min'  },
      { id: 9,  slug: 'limit-fetch',              title: 'Limiting Results — LIMIT / TOP / FETCH',    description: 'Only get the rows you need — critical for performance',             tags: ['LIMIT','TOP','FETCH NEXT','Pagination basics'],                                                                                       status: 'coming-soon', readTime: '8 min'  },
      { id: 10, slug: 'distinct',                 title: 'Removing Duplicates — DISTINCT',            description: 'See only unique values in your results',                           tags: ['DISTINCT','Unique values','Deduplication','COUNT DISTINCT'],                                                                          status: 'coming-soon', readTime: '7 min'  },
      { id: 11, slug: 'null-values',              title: 'Working with NULL Values',                  description: 'NULL is not zero, not empty — it is the absence of data',          tags: ['NULL','IS NULL','IS NOT NULL','COALESCE','NULLIF'],                                                                                   status: 'coming-soon', readTime: '12 min' },
      { id: 12, slug: 'arithmetic-expressions',   title: 'Column Calculations — Arithmetic',          description: 'Do math directly inside your SQL query',                           tags: ['Arithmetic','Expressions','Price calculations','Derived columns'],                                                                    status: 'coming-soon', readTime: '8 min'  },
      { id: 13, slug: 'aliases',                  title: 'Renaming Columns — AS (Aliases)',           description: 'Give columns and tables readable names',                           tags: ['AS','Column alias','Table alias','Readability'],                                                                                      status: 'coming-soon', readTime: '7 min'  },
      { id: 14, slug: 'like-wildcards',           title: 'Pattern Matching — LIKE & Wildcards',       description: 'Find rows that match a pattern, not an exact value',               tags: ['LIKE','%  wildcard','_ wildcard','Pattern search'],                                                                                   status: 'coming-soon', readTime: '10 min' },
    ],
  },
  {
    id: 3, title: 'Filtering & Logic', color: '#f97316',
    modules: [
      { id: 15, slug: 'in-between',               title: 'IN and BETWEEN Operators',                  description: 'Shorthand for multiple OR conditions and range checks',            tags: ['IN','NOT IN','BETWEEN','Range filters'],                                                                                              status: 'coming-soon', readTime: '8 min'  },
      { id: 16, slug: 'case-when',                title: 'CASE WHEN — Conditional Logic',             description: 'The SQL equivalent of an if-else statement',                       tags: ['CASE WHEN','THEN','ELSE','Conditional columns'],                                                                                      status: 'coming-soon', readTime: '12 min' },
      { id: 17, slug: 'complex-where',            title: 'Complex WHERE — Combining Conditions',      description: 'Mastering brackets, precedence, and complex filters',               tags: ['Brackets','Precedence','AND vs OR','Complex logic'],                                                                                  status: 'coming-soon', readTime: '10 min' },
    ],
  },
  {
    id: 4, title: 'Writing & Changing Data', color: '#ef4444',
    modules: [
      { id: 18, slug: 'data-types',               title: 'Data Types in SQL',                         description: 'INT, VARCHAR, DATE, BOOLEAN, DECIMAL — choosing the right type',  tags: ['INT','VARCHAR','DATE','BOOLEAN','DECIMAL','Choosing types'],                                                                          status: 'coming-soon', readTime: '12 min' },
      { id: 19, slug: 'create-table',             title: 'Creating Tables — CREATE TABLE',            description: 'Design and build your first database table',                       tags: ['CREATE TABLE','Column definitions','Data types','Table structure'],                                                                    status: 'coming-soon', readTime: '14 min' },
      { id: 20, slug: 'insert-into',              title: 'Adding Data — INSERT INTO',                 description: 'Put data into your tables, one row or many at once',               tags: ['INSERT INTO','VALUES','Bulk insert','Multi-row insert'],                                                                              status: 'coming-soon', readTime: '10 min' },
      { id: 21, slug: 'update',                   title: 'Updating Data — UPDATE',                    description: 'Change existing rows safely — the WHERE matters more than ever',   tags: ['UPDATE','SET','WHERE on UPDATE','Safe updates'],                                                                                      status: 'coming-soon', readTime: '10 min' },
      { id: 22, slug: 'delete',                   title: 'Deleting Data — DELETE',                    description: 'Remove rows — and why you should always double-check first',      tags: ['DELETE','WHERE on DELETE','Soft delete','Dangerous without WHERE'],                                                                    status: 'coming-soon', readTime: '10 min' },
    ],
  },
  {
    id: 5, title: 'Database Design', color: '#8b5cf6',
    modules: [
      { id: 23, slug: 'constraints',              title: 'Constraints — Rules for Your Data',         description: 'PRIMARY KEY, FOREIGN KEY, NOT NULL, UNIQUE, DEFAULT, CHECK',      tags: ['PRIMARY KEY','FOREIGN KEY','NOT NULL','UNIQUE','DEFAULT','CHECK'],                                                                    status: 'coming-soon', readTime: '16 min' },
      { id: 24, slug: 'alter-table',              title: 'Changing Structure — ALTER TABLE',          description: 'Add, remove, or rename columns in an existing table',              tags: ['ALTER TABLE','ADD COLUMN','DROP COLUMN','RENAME'],                                                                                    status: 'coming-soon', readTime: '10 min' },
      { id: 25, slug: 'drop-truncate',            title: 'DROP & TRUNCATE — Removing Tables',         description: 'The difference between deleting data and deleting structure',      tags: ['DROP TABLE','TRUNCATE','DELETE vs TRUNCATE','Irreversible ops'],                                                                      status: 'coming-soon', readTime: '8 min'  },
      { id: 26, slug: 'normalization',            title: 'Normalization & ER Diagrams',               description: '1NF, 2NF, 3NF — designing tables that make sense',                tags: ['1NF','2NF','3NF','ER diagrams','Good table design'],                                                                                  status: 'coming-soon', readTime: '20 min' },
    ],
  },
  {
    id: 6, title: 'Aggregation', color: '#10b981',
    modules: [
      { id: 27, slug: 'aggregate-functions',      title: 'Aggregate Functions',                       description: 'COUNT, SUM, AVG, MIN, MAX — summarize your data',                 tags: ['COUNT','SUM','AVG','MIN','MAX','Summarizing data'],                                                                                   status: 'coming-soon', readTime: '12 min' },
      { id: 28, slug: 'group-by',                 title: 'Grouping Data — GROUP BY',                  description: 'The most powerful tool for data analysis in SQL',                  tags: ['GROUP BY','Grouping rows','Aggregate per group','Analysis patterns'],                                                                 status: 'coming-soon', readTime: '14 min' },
      { id: 29, slug: 'having',                   title: 'Filtering Groups — HAVING',                 description: 'Filter after grouping — not the same as WHERE',                   tags: ['HAVING','Filter groups','HAVING vs WHERE','Post-aggregation filter'],                                                                 status: 'coming-soon', readTime: '10 min' },
    ],
  },
  {
    id: 7, title: 'Joins', color: '#06b6d4',
    modules: [
      { id: 30, slug: 'joins-intro',              title: 'Introduction to Joins',                     description: 'Why data lives in multiple tables and how to combine it',          tags: ['Why joins exist','Relational model','Join concept','ON clause'],                                                                      status: 'coming-soon', readTime: '12 min' },
      { id: 31, slug: 'inner-join',               title: 'INNER JOIN — Only Matching Rows',           description: 'The most common join — rows that exist in both tables',            tags: ['INNER JOIN','Matching rows','ON condition','Most used join'],                                                                         status: 'coming-soon', readTime: '14 min' },
      { id: 32, slug: 'left-right-join',          title: 'LEFT JOIN & RIGHT JOIN',                    description: 'Keep all rows from one side, even without a match',               tags: ['LEFT JOIN','RIGHT JOIN','NULL in joins','Unmatched rows'],                                                                            status: 'coming-soon', readTime: '14 min' },
      { id: 33, slug: 'full-outer-join',          title: 'FULL OUTER JOIN',                           description: 'All rows from both tables — matched or not',                       tags: ['FULL OUTER JOIN','All rows','Both sides','NULL filling'],                                                                             status: 'coming-soon', readTime: '10 min' },
      { id: 34, slug: 'self-join',                title: 'SELF JOIN — A Table Joining Itself',        description: 'The trick behind org charts and manager hierarchies',              tags: ['SELF JOIN','Hierarchy','Manager-employee','Recursive relation'],                                                                      status: 'coming-soon', readTime: '12 min' },
      { id: 35, slug: 'cross-join',               title: 'CROSS JOIN — Every Combination',            description: 'Every row paired with every other row — use with care',           tags: ['CROSS JOIN','Cartesian product','All combinations','Use cases'],                                                                      status: 'coming-soon', readTime: '8 min'  },
    ],
  },
  {
    id: 8, title: 'Subqueries & Set Operations', color: '#ec4899',
    modules: [
      { id: 36, slug: 'subqueries',               title: 'Subqueries — Queries Inside Queries',       description: 'Use the result of one query inside another',                       tags: ['Subquery','Nested query','Subquery in WHERE','Subquery in SELECT'],                                                                   status: 'coming-soon', readTime: '14 min' },
      { id: 37, slug: 'correlated-subqueries',    title: 'Correlated Subqueries',                     description: 'Subqueries that reference the outer query — row by row',           tags: ['Correlated','Outer query reference','Row-by-row','Performance impact'],                                                               status: 'coming-soon', readTime: '14 min' },
      { id: 38, slug: 'exists-not-exists',        title: 'EXISTS & NOT EXISTS',                       description: 'Check if any matching rows exist — faster than IN for large sets', tags: ['EXISTS','NOT EXISTS','Existence check','vs IN operator'],                                                                             status: 'coming-soon', readTime: '12 min' },
      { id: 39, slug: 'union-intersect-except',   title: 'UNION, INTERSECT, EXCEPT',                  description: 'Combine or compare results from multiple queries',                 tags: ['UNION','UNION ALL','INTERSECT','EXCEPT','Set operations'],                                                                            status: 'coming-soon', readTime: '12 min' },
      { id: 40, slug: 'derived-tables',           title: 'Derived Tables — Subquery in FROM',         description: 'Treat a query result as a temporary table',                        tags: ['Derived table','Subquery in FROM','Inline view','Temporary result'],                                                                  status: 'coming-soon', readTime: '10 min' },
    ],
  },
  {
    id: 9, title: 'SQL Functions', color: '#f59e0b',
    modules: [
      { id: 41, slug: 'string-functions',         title: 'String Functions',                          description: 'UPPER, LOWER, CONCAT, LENGTH, TRIM, REPLACE, SUBSTRING',         tags: ['UPPER','LOWER','CONCAT','TRIM','SUBSTRING','REPLACE'],                                                                                status: 'coming-soon', readTime: '14 min' },
      { id: 42, slug: 'date-time-functions',      title: 'Date & Time Functions',                     description: 'NOW, DATEDIFF, DATE_FORMAT — work with dates like a pro',         tags: ['NOW','DATEDIFF','DATE_FORMAT','DATEPART','Date arithmetic'],                                                                          status: 'coming-soon', readTime: '14 min' },
      { id: 43, slug: 'math-functions',           title: 'Math Functions',                            description: 'ROUND, FLOOR, CEIL, ABS, MOD — math inside SQL',                 tags: ['ROUND','FLOOR','CEILING','ABS','MOD','Math in queries'],                                                                              status: 'coming-soon', readTime: '10 min' },
      { id: 44, slug: 'cast-convert',             title: 'Type Conversion — CAST & CONVERT',          description: 'Change a column\'s data type on the fly',                          tags: ['CAST','CONVERT','Type conversion','Implicit vs explicit'],                                                                            status: 'coming-soon', readTime: '10 min' },
    ],
  },
  {
    id: 10, title: 'Advanced SQL Objects', color: '#ef4444',
    modules: [
      { id: 45, slug: 'views',                    title: 'Views — Virtual Tables',                    description: 'Save a query as a named view — query it like a table',            tags: ['CREATE VIEW','Virtual table','Updatable views','View use cases'],                                                                     status: 'coming-soon', readTime: '12 min' },
      { id: 46, slug: 'indexes',                  title: 'Indexes — Making Queries Fast',             description: 'The single most impactful performance tool in SQL',                tags: ['CREATE INDEX','B-tree index','Composite index','When to index'],                                                                      status: 'coming-soon', readTime: '14 min' },
      { id: 47, slug: 'transactions',             title: 'Transactions — COMMIT & ROLLBACK',          description: 'Group queries into all-or-nothing operations',                     tags: ['BEGIN','COMMIT','ROLLBACK','SAVEPOINT','Atomicity'],                                                                                  status: 'coming-soon', readTime: '12 min' },
      { id: 48, slug: 'acid-properties',          title: 'ACID Properties',                           description: 'The 4 rules every reliable database follows',                      tags: ['Atomicity','Consistency','Isolation','Durability','Why ACID matters'],                                                                status: 'coming-soon', readTime: '14 min' },
      { id: 49, slug: 'stored-procedures',        title: 'Stored Procedures',                         description: 'Save and reuse complex SQL logic on the server',                   tags: ['CREATE PROCEDURE','Parameters','CALL','Reusable logic'],                                                                              status: 'coming-soon', readTime: '14 min' },
      { id: 50, slug: 'user-defined-functions',   title: 'User-Defined Functions',                    description: 'Build your own SQL functions for repeated logic',                  tags: ['CREATE FUNCTION','Scalar UDF','Table-valued UDF','RETURNS'],                                                                          status: 'coming-soon', readTime: '12 min' },
      { id: 51, slug: 'triggers',                 title: 'Triggers — Auto-Run on Events',             description: 'SQL that runs automatically when data changes',                    tags: ['CREATE TRIGGER','BEFORE / AFTER','INSERT / UPDATE / DELETE','Audit logs'],                                                            status: 'coming-soon', readTime: '14 min' },
    ],
  },
  {
    id: 11, title: 'Window Functions & CTEs', color: '#8b5cf6',
    modules: [
      { id: 52, slug: 'window-functions-intro',   title: 'Window Functions — OVER & PARTITION BY',    description: 'Aggregate without collapsing rows — the most powerful SQL feature', tags: ['OVER','PARTITION BY','Window frame','No GROUP BY collapse'],                                                                         status: 'coming-soon', readTime: '16 min' },
      { id: 53, slug: 'ranking-functions',        title: 'Ranking — ROW_NUMBER, RANK, DENSE_RANK',    description: 'Rank rows within groups — critical for interview questions',        tags: ['ROW_NUMBER','RANK','DENSE_RANK','NTILE','Ranking patterns'],                                                                         status: 'coming-soon', readTime: '14 min' },
      { id: 54, slug: 'analytics-lag-lead',       title: 'LAG, LEAD, FIRST_VALUE, LAST_VALUE',        description: 'Access other rows\' values from the current row',                  tags: ['LAG','LEAD','FIRST_VALUE','LAST_VALUE','Row comparison'],                                                                             status: 'coming-soon', readTime: '14 min' },
      { id: 55, slug: 'cte-with-clause',          title: 'CTEs — WITH Clause',                        description: 'Write readable, layered queries with Common Table Expressions',    tags: ['WITH','CTE','Named subquery','Multiple CTEs','Readability'],                                                                          status: 'coming-soon', readTime: '14 min' },
      { id: 56, slug: 'recursive-cte',            title: 'Recursive CTEs — Hierarchies & Trees',      description: 'Query parent-child relationships with recursive queries',           tags: ['RECURSIVE','Hierarchy','Tree traversal','UNION ALL in CTE'],                                                                         status: 'coming-soon', readTime: '16 min' },
    ],
  },
  {
    id: 12, title: 'Performance & Optimization', color: '#10b981',
    modules: [
      { id: 57, slug: 'explain-analyze',          title: 'EXPLAIN & EXPLAIN ANALYZE',                 description: 'Read the query execution plan — know why a query is slow',         tags: ['EXPLAIN','Query plan','Seq scan vs index scan','Execution cost'],                                                                     status: 'coming-soon', readTime: '14 min' },
      { id: 58, slug: 'index-strategies',         title: 'Index Strategies',                          description: 'Composite indexes, covering indexes, when NOT to index',           tags: ['Composite index','Covering index','Index selectivity','When to avoid'],                                                               status: 'coming-soon', readTime: '14 min' },
      { id: 59, slug: 'query-best-practices',     title: 'Query Best Practices',                      description: 'Write clean, fast, readable SQL your team will thank you for',     tags: ['SELECT *  avoid','SARGability','Avoid functions on indexed cols','Clean SQL'],                                                        status: 'coming-soon', readTime: '14 min' },
    ],
  },
  {
    id: 13, title: 'Real-World & Interview', color: '#06b6d4',
    modules: [
      { id: 60, slug: 'sql-for-data-analysis',    title: 'SQL for Data Analysis',                     description: 'Real case studies using Swiggy, Zepto, HDFC, and FreshMart data', tags: ['Swiggy case study','Zepto data','HDFC analysis','FreshMart full query'],                                                              status: 'coming-soon', readTime: '30 min' },
      { id: 61, slug: 'interview-questions',      title: 'Top 50 SQL Interview Questions',            description: 'Every question with full explanation, query, and common traps',     tags: ['Window fn questions','Join questions','CTE questions','Tricky NULLs','50 answers'],                                                   status: 'coming-soon', readTime: '60 min' },
      { id: 62, slug: 'sql-projects',             title: '3 Real SQL Projects',                       description: 'Build a full database, write analysis queries, present results',   tags: ['FreshMart project','E-commerce DB','Analytics dashboard','End to end'],                                                               status: 'coming-soon', readTime: '90 min' },
    ],
  },
];