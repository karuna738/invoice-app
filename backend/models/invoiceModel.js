const db = require('../config/db');

const Invoice = {
  getInvoice: (invoice_id, user_id, callback) => {
    db.query(
      `SELECT * FROM invoices 
       WHERE invoice_id = ? AND user_id = ?`,
      [invoice_id, user_id],
      callback
    );
  },

  createWithItems: (data, callback) => {
    const {
      bill_to_id, bill_from_id, due_date, invoice_date,
      subtotal, tax_rate, total, payment_id, term_id,
      payment_status, user_id, items
    } = data;

    db.getConnection((err, connection) => {
      if (err) return callback(err);

      connection.beginTransaction((err) => {
        if (err) {
          connection.release();
          return callback(err);
        }

        connection.query(
          'SELECT MAX(invoice_id) AS maxId FROM invoices',
          (err, result) => {
            if (err) {
              return connection.rollback(() => {
                connection.release();
                callback(err);
              });
            }

            const nextId = (result[0].maxId || 0) + 1;
            const invoice_number = `INV-${String(nextId).padStart(4, '0')}`;

            connection.query(
              `INSERT INTO invoices 
               (invoice_number, bill_to_id, bill_from_id, due_date, invoice_date, 
                subtotal, tax_rate, total, payment_id, term_id, payment_status, user_id)
               VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
              [
                invoice_number, bill_to_id, bill_from_id, due_date, invoice_date,
                subtotal, tax_rate, total, payment_id, term_id, payment_status, user_id
              ],
              (err, invoiceResult) => {
                if (err) {
                  return connection.rollback(() => {
                    connection.release();
                    callback(err);
                  });
                }

                const invoiceId = invoiceResult.insertId;

                if (!items.length) {
                  return connection.commit(() => {
                    connection.release();
                    callback(null, { invoiceId, invoice_number });
                  });
                }

                const itemValues = items.map(item => [
                  invoiceId, item.description, item.price, item.quantity, item.total
                ]);

                connection.query(
                  `INSERT INTO invoice_items 
                   (invoice_id, description, price, quantity, total) VALUES ?`,
                  [itemValues],
                  (err) => {
                    if (err) {
                      return connection.rollback(() => {
                        connection.release();
                        callback(err);
                      });
                    }

                    connection.commit(() => {
                      connection.release();
                      callback(null, { invoiceId, invoice_number });
                    });
                  }
                );
              }
            );
          }
        );
      });
    });
  },

  getAll: (user_id, callback) => {
    db.query(
      `SELECT i.*, c1.name AS bill_to_name, c2.name AS bill_from_name
       FROM invoices i
       JOIN customers c1 ON i.bill_to_id = c1.customer_id
       JOIN customers c2 ON i.bill_from_id = c2.customer_id
       WHERE i.user_id = ?
       ORDER BY i.invoice_id DESC`,
      [user_id],
      callback
    );
  },

  getInvoiceWithItems: (id, user_id, callback) => {
    db.query(
      `
      SELECT 
        i.*, 
        c1.name AS bill_to_name,
        c2.name AS bill_from_name,
        pm.payment_id,
        pm.bank_name,
        pm.account_number,
        tc.term_id,
        tc.terms,
        ii.item_id,
        ii.description,
        ii.price,
        ii.quantity,
        ii.total AS item_total
      FROM invoices i
      JOIN customers c1 ON i.bill_to_id = c1.customer_id
      JOIN customers c2 ON i.bill_from_id = c2.customer_id
      LEFT JOIN payment_methods pm ON i.payment_id = pm.payment_id
      LEFT JOIN terms_conditions tc ON i.term_id = tc.term_id
      LEFT JOIN invoice_items ii ON i.invoice_id = ii.invoice_id
      WHERE i.invoice_id = ? AND i.user_id = ?`,
      [id, user_id],
      callback
    );
  },

  deleteInvoice: (id, user_id, callback) => {
    db.getConnection((err, connection) => {
      if (err) return callback(err);

      connection.beginTransaction(() => {
        connection.query(
          'DELETE FROM invoice_items WHERE invoice_id = ?',
          [id],
          (err) => {
            if (err) {
              return connection.rollback(() => {
                connection.release();
                callback(err);
              });
            }

            connection.query(
              'DELETE FROM invoices WHERE invoice_id = ? AND user_id = ?',
              [id, user_id],
              (err, result) => {
                if (err) {
                  return connection.rollback(() => {
                    connection.release();
                    callback(err);
                  });
                }

                connection.commit(() => {
                  connection.release();
                  callback(null, result.affectedRows > 0);
                });
              }
            );
          }
        );
      });
    });
  },

  updateWithItems: (id, data, callback) => {
    const {
      bill_to_id, bill_from_id, due_date, invoice_date,
      subtotal, tax_rate, total, payment_id, term_id,
      payment_status, items, user_id
    } = data;

    db.getConnection((err, connection) => {
      if (err) return callback(err);

      connection.beginTransaction(() => {
        connection.query(
          `UPDATE invoices SET
            bill_to_id = ?, bill_from_id = ?, due_date = ?, invoice_date = ?,
            subtotal = ?, tax_rate = ?, total = ?,
            payment_id = ?, payment_status = ?, term_id = ?
           WHERE invoice_id = ? AND user_id = ?`,
          [
            bill_to_id, bill_from_id, due_date, invoice_date,
            subtotal, tax_rate, total,
            payment_id, payment_status, term_id,
            id, user_id
          ],
          (err, result) => {
            if (err || !result.affectedRows) {
              return connection.rollback(() => {
                connection.release();
                callback(null, { updated: false });
              });
            }

            connection.query(
              'DELETE FROM invoice_items WHERE invoice_id = ?',
              [id],
              (err) => {
                if (err) {
                  return connection.rollback(() => {
                    connection.release();
                    callback(err);
                  });
                }

                if (!items.length) {
                  return connection.commit(() => {
                    connection.release();
                    callback(null, { updated: true });
                  });
                }

                const itemValues = items.map(item => [
                  id, item.description, item.price, item.quantity, item.total
                ]);

                connection.query(
                  'INSERT INTO invoice_items (invoice_id, description, price, quantity, total) VALUES ?',
                  [itemValues],
                  (err) => {
                    if (err) {
                      return connection.rollback(() => {
                        connection.release();
                        callback(err);
                      });
                    }

                    connection.commit(() => {
                      connection.release();
                      callback(null, { updated: true });
                    });
                  }
                );
              }
            );
          }
        );
      });
    });
  }
};

module.exports = Invoice;
