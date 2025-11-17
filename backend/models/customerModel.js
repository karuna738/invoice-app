const db = require('../config/db');

const Customer = {

  create: (data, callback) => {
    const { name, company_name, address, city, state, zip_code, email, phone, type, user_id } = data;

    db.query(
      `INSERT INTO customers 
      (name, company_name, address, city, state, zip_code, email, phone, type, user_id) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [name, company_name, address, city, state, zip_code, email, phone, type, user_id],
      callback
    );
  },

  getAll: (userId, callback) => {
    db.query(
      `SELECT * FROM customers WHERE user_id = ? ORDER BY customer_id DESC`,
      [userId],
      callback
    );
  },

  deleteCustomer: (id, userId, callback) => {
    db.query(
      `DELETE FROM customers 
       WHERE customer_id = ? AND user_id = ?`,
      [id, userId],
      (err, result) => {
        if (err) return callback(err);
        callback(null, result.affectedRows > 0);
      }
    );
  },

  update: (id, data, callback) => {
    const { name, company_name, address, city, state, zip_code, email, phone, type, user_id } = data;

    db.query(
      `UPDATE customers
       SET name = ?, company_name = ?, address = ?, city = ?, state = ?, 
           zip_code = ?, email = ?, phone = ?, type = ?
       WHERE customer_id = ? AND user_id = ?`,
      [name, company_name, address, city, state, zip_code, email, phone, type, id, user_id],
      (err, result) => {
        if (err) return callback(err);
        callback(null, result.affectedRows > 0);
      }
    );
  }
};

module.exports = Customer;

