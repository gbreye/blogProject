import dotenv from 'dotenv';
dotenv.config();
import Database from 'better-sqlite3';

const db = new Database('../../database.db', { verbose: console.log });

db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL,
    admin INTEGER DEFAULT 0
  );

  CREATE TABLE IF NOT EXISTS pages (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    subTitle TEXT,
    structure TEXT
  );
`);

export default db;