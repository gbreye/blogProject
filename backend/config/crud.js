import dbPromise from "./database.js";

export default class User {
  constructor() {
    this.dbPromise = dbPromise;
  }

  async create(name, email, password) {
    const db = await this.dbPromise;
    const sql = "INSERT INTO users (name, email, password) VALUES (?, ?, ?)";
    return new Promise((resolve, reject) => {
      db.run(sql, [name, email, password], function (err) {
        if (err) return reject(err);
        resolve({ id: this.lastID, name, email });
      });
    });
  }

  async find(id) {
    const db = await this.dbPromise;
    const sql = 'SELECT * FROM users WHERE id = ?';
    return new Promise((resolve, reject) => {
      db.get(sql, [id], (err, row) => {
        if (err) return reject(err);
        resolve(row);
      });
    });
  }
}