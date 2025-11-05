const db = require('../config/db');

exports.createUser = (name, email, phone, hashedPassword) =>
  new Promise((resolve, reject) => {
    const sql = 'INSERT INTO users (name, email, phone, password) VALUES (?, ?, ?, ?)';
    db.query(sql, [name, email, phone, hashedPassword], (err, result) =>
      err ? reject(err) : resolve(result)
    );
  });

exports.findByEmailOrPhone = (username) =>
  new Promise((resolve, reject) => {
    const sql = 'SELECT * FROM users WHERE email = ? OR phone = ? LIMIT 1';
    db.query(sql, [username, username], (err, rows) =>
      err ? reject(err) : resolve(rows[0])
    );
  });

exports.findByEmail = (email) =>
  new Promise((resolve, reject) => {
    db.query('SELECT * FROM users WHERE email = ? LIMIT 1', [email], (err, rows) =>
      err ? reject(err) : resolve(rows[0])
    );
  });

exports.updatePasswordByEmail = (email, hashedPassword) =>
  new Promise((resolve, reject) => {
    db.query('UPDATE users SET password = ? WHERE email = ?', [hashedPassword, email], (err, r) =>
      err ? reject(err) : resolve(r)
    );
  });
