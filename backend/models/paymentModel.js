const db = require('../config/db');

exports.add = (data, callback) => {
  const { bank_name, account_number } = data;

  db.query(
    'INSERT INTO payment_methods (bank_name, account_number) VALUES (?, ?)',
    [bank_name, account_number],
    callback
  );
};

exports.getByInvoice = (invoice_id, callback) => {
  db.query('SELECT * FROM payment_methods', [invoice_id], callback);
};

exports.delete = (id, callback) => {
  db.query('DELETE FROM payment_methods WHERE payment_id = ?', [id], callback);
};

exports.update = (id, data, callback) => {
  const { bank_name, account_number } = data;
  db.query(
    'UPDATE payment_methods SET bank_name = ?, account_number = ? WHERE payment_id = ?',
    [bank_name, account_number, id],
    callback
  );
};
