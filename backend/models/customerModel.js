const db = require('../config/db');

const Customer = {
  create: (data, callback) => {
    const { name, company_name, address, city, state, zip_code, email, phone, type } = data;
    db.query(
      'INSERT INTO customers (name, company_name, address, city, state, zip_code, email, phone, type) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [name, company_name, address, city, state, zip_code, email, phone, type],
      callback
    );
  },

  getAll: (callback) => {
    // db.query('SELECT * FROM customers', callback);
    db.query('SELECT * FROM customers ORDER BY customer_id DESC', callback);
  },

  deleteCustomer: (id, callback) => {
    db.query('DELETE FROM customers WHERE customer_id = ?', [id], (err, result) => {
      if (err) return callback(err);
      callback(null, result.affectedRows > 0);
    });
  },

  update: (id, data, callback) => {
    const { name, company_name, address, city, state, zip_code, email, phone, type } = data;
    db.query(
      `UPDATE customers 
         SET name = ?, company_name = ?, address = ?, city = ?, state = ?, 
             zip_code = ?, email = ?, phone = ?, type = ?
         WHERE customer_id = ?`,
      [name, company_name, address, city, state, zip_code, email, phone, type, id],
      (err, result) => {
        if (err) return callback(err);
        callback(null, result.affectedRows > 0);
      }
    );
  },
};

module.exports = Customer;
