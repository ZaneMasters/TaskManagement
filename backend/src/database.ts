import sqlite3 from 'sqlite3';
import { open, Database } from 'sqlite';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config();

let db: Database<sqlite3.Database, sqlite3.Statement>;

export const connectDB = async () => {
  const dbPath = process.env.DB_PATH || './database.sqlite';
  
  db = await open({
    filename: path.resolve(dbPath),
    driver: sqlite3.Database
  });

  console.log(`Connected to SQLite database at ${dbPath}`);

  // Initialize tables
  await db.exec(`
    CREATE TABLE IF NOT EXISTS tasks (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      description TEXT,
      status TEXT NOT NULL CHECK (status IN ('pending', 'in_progress', 'done')),
      createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
      updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  console.log('Tasks table initialized.');
};

export const getDB = () => {
  if (!db) {
    throw new Error('Database connection not established.');
  }
  return db;
};
