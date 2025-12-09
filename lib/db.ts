// lib/db.ts
import Database from 'better-sqlite3';
import path from 'path';
import fs from 'fs';

// Tạo đường dẫn vào folder data
const dbPath = path.join(process.cwd(), 'data', 'shop.db');

// Đảm bảo folder data tồn tại (phòng hờ)
const dir = path.dirname(dbPath);
if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir, { recursive: true });
}

const db = new Database(dbPath);


db.pragma('journal_mode = WAL');


const initDb = () => {

  db.exec(`
    CREATE TABLE IF NOT EXISTS admins (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT UNIQUE,
      password TEXT
    )
  `);


  db.exec(`
    CREATE TABLE IF NOT EXISTS categories (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT
    )
  `);


  db.exec(`
    CREATE TABLE IF NOT EXISTS products (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      price REAL,
      image TEXT,
      rating INTEGER DEFAULT 5,
      url TEXT,
      categoryId INTEGER,
      FOREIGN KEY(categoryId) REFERENCES categories(id)
    )
  `);


  db.exec(`
    CREATE TABLE IF NOT EXISTS configs (
      key TEXT PRIMARY KEY,
      value TEXT
    )
  `);
};

initDb();

export default db;