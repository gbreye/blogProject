import db from './database.js';

class User {
  constructor() {
    this.db = db;
  }

  create(username, email, password, admin) {
    const sql = 'INSERT INTO users (username, email, password, admin) VALUES (?, ?, ?, ?)';
    const stmt = this.db.prepare(sql);
    const result = stmt.run(username, email, password, admin);
    
    return { id: result.lastInsertRowid, username, email };
  }

  find(id) {
    const sql = 'SELECT * FROM users WHERE id = ?';
    return this.db.prepare(sql).get(id);
  }

  findByEmail(email) {
    const sql = 'SELECT * FROM users WHERE email = ?';
    return this.db.prepare(sql).get(email);
  }

  delete(id) {
    const sql = 'DELETE FROM users WHERE id = ?';
    const result = this.db.prepare(sql).run(id);
    return { changes: result.changes };
  }

  addAdmin(id) {
    const sql = 'UPDATE users SET admin = 1 WHERE id = ?';
    const result = this.db.prepare(sql).run(id);
    return { changes: result.changes };
  }

  removeAdmin(id) {
    const sql = 'UPDATE users SET admin = 0 WHERE id = ?';
    const result = this.db.prepare(sql).run(id);
    return { changes: result.changes };
  }
}

class Page {
  constructor() {
    this.db = db;
  }

  create(title, subTitle, structure) {
    const sql = 'INSERT INTO pages (title, subTitle, structure) VALUES (?, ?, ?)';
    const result = this.db.prepare(sql).run(title, subTitle, structure);
    return { id: result.lastInsertRowid, title, subTitle, structure };
  }

  find(id) {
    const sql = 'SELECT * FROM pages WHERE id = ?';
    return this.db.prepare(sql).get(id);
  }

  findAll() {
    const sql = 'SELECT * FROM pages';
    return this.db.prepare(sql).all();
  }

  findHome() {
    const sql = 'SELECT * FROM pages LIMIT 5';
    return this.db.prepare(sql).all();
  }

  delete(id) {
    const sql = 'DELETE FROM pages WHERE id = ?';
    const result = this.db.prepare(sql).run(id);
    return { changes: result.changes };
  }
}


export default new User();
export const page = new Page();
