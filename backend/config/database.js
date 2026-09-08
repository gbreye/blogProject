import dotenv from 'dotenv';
dotenv.config();
import sqlite3 from 'sqlite3';

const dbPromise = new Promise((resolve, reject) => {
  const db = new sqlite3.Database('../../database.db', (err) => {
    if (err) {
      console.error('Error while connecting to db: ', err);
      reject(err);
    } else {
      console.log('Connected to db!');
      resolve(db);
    }
  });
});

export default dbPromise;