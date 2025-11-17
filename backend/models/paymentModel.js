const db = require('../config/db');

exports.add = (data, callback) => {
  const { bank_name, account_number, user_id } = data;

  db.query(
    `INSERT INTO payment_methods (bank_name, account_number, user_id)
     VALUES (?, ?, ?)`,
    [bank_name, account_number, user_id],
    callback
  );
};

exports.getAll = (user_id, callback) => {
  db.query(
    `SELECT * FROM payment_methods 
     WHERE user_id = ? 
     ORDER BY payment_id DESC`,
    [user_id],
    callback
  );
};

exports.getById = (payment_id, user_id, callback) => {
  db.query(
    `SELECT * FROM payment_methods 
     WHERE payment_id = ? AND user_id = ?`,
    [payment_id, user_id],
    callback
  );
};

exports.delete = (payment_id, user_id, callback) => {
  db.query(
    `DELETE FROM payment_methods 
     WHERE payment_id = ? AND user_id = ?`,
    [payment_id, user_id],
    callback
  );
};

exports.update = (payment_id, data, callback) => {
  const { bank_name, account_number, user_id } = data;

  db.query(
    `UPDATE payment_methods 
     SET bank_name = ?, account_number = ?
     WHERE payment_id = ? AND user_id = ?`,
    [bank_name, account_number, payment_id, user_id],
    callback
  );
};
