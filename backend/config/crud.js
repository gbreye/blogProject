import dbPromise from "./database.js";

export default class User {
  constructor() {
    this.dbPromise = dbPromise;
  }

  async create(username, email, password, admin) {
    const db = await this.dbPromise;
    const sql = "INSERT INTO users (username, email, password, admin) VALUES (?, ?, ?)";
    return new Promise((resolve, reject) => {
      db.run(sql, [username, email, password, admin], function (err) {
        if (err) return reject(err);
        resolve({ id: this.lastID, username, email });
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

  async delete(id) {
    const db = await this.dbPromise;
    const sql = 'DELETE FROM users WHERE id = ?';
    return new Promise((resolve, reject) => {
        db.run(sql, [id], function (err)  {
            if(err) return reject(err);
            resolve({ changes: this.changes });
        });
    });
  }

  async addAdmin(id) {
    const db = await this.dbPromise;
    const sql = 'UPDATE users SET admin = 1 WHERE id = ?';
    return new Promise((resolve, reject) => {
        db.run(sql, [id], function (err) {
            if(err) return reject(err);
            resolve({ changes: this.changes });
        });
    });
  }

  async removeAdmin(id) {
    const db = await this.dbPromise;
    const sql = 'UPDATE users SET admin = 0 WHERE id = ?';
    return new Promise((resolve, reject) => {
        db.run(sql, [id], function (err) {
            if(err) return reject(err);
            resolve({ changes: this.changes });
        });
    });
  }


  async modifyUserName(username) {

  }
}