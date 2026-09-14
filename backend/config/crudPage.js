import db from './database.js';

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


export default new Page();
