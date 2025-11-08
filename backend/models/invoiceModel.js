const db = require('../config/db');

const Invoice = {
  createWithItems: (data, callback) => {
    const {
      bill_to_id,
      bill_from_id,
      due_date,
      invoice_date,
      subtotal,
      tax_rate,
      total,
      payment_id,
      term_id,
      payment_status,
      items,
    } = data;

    db.getConnection((err, connection) => {
      if (err) return callback(err);

      connection.beginTransaction((err) => {
        if (err) {
          connection.release();
          return callback(err);
        }

        // Use MAX(invoice_id) to generate invoice number
        connection.query('SELECT MAX(invoice_id) AS maxId FROM invoices', (err, result) => {
          if (err) {
            return connection.rollback(() => {
              connection.release();
              callback(err);
            });
          }

          const nextId = (result[0].maxId || 0) + 1;
          const invoice_number = `INV-${String(nextId).padStart(4, '0')}`;

          // Insert invoice
          connection.query(
            `INSERT INTO invoices 
                        (invoice_number, bill_to_id, bill_from_id, due_date, invoice_date, subtotal, tax_rate, total, payment_id, term_id, payment_status) 
                        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [
              invoice_number,
              bill_to_id,
              bill_from_id,
              due_date,
              invoice_date,
              subtotal,
              tax_rate,
              total,
              payment_id,
              term_id,
              payment_status
            ],
            (err, invoiceResult) => {
              if (err) {
                return connection.rollback(() => {
                  connection.release();
                  callback(err);
                });
              }

              const invoiceId = invoiceResult.insertId;

              // If there are no items, commit
              if (!items || items.length === 0) {
                return connection.commit((err) => {
                  if (err) {
                    return connection.rollback(() => {
                      connection.release();
                      callback(err);
                    });
                  }
                  connection.release();
                  callback(null, {
                    message: 'Invoice created successfully',
                    invoiceId,
                    invoice_number,
                  });
                });
              }

              // Insert items
              const itemValues = items.map((item) => [
                invoiceId,
                item.description,
                item.price,
                item.quantity,
                item.total,
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

                  connection.commit((err) => {
                    if (err) {
                      return connection.rollback(() => {
                        connection.release();
                        callback(err);
                      });
                    }
                    connection.release();
                    callback(null, {
                      message: 'Invoice created successfully',
                      invoiceId,
                      invoice_number,
                    });
                  });
                }
              );
            }
          );
        });
      });
    });
  },

  getAll: (callback) => {
    db.query(
      `SELECT i.*, c1.name AS bill_to_name, c2.name AS bill_from_name
         FROM invoices i
         JOIN customers c1 ON i.bill_to_id = c1.customer_id
         JOIN customers c2 ON i.bill_from_id = c2.customer_id
         ORDER BY i.invoice_id DESC`,
      callback
    );
  },

  getInvoiceWithItems: (id, callback) => {
    const query = `
        SELECT 
            i.invoice_id,
            i.invoice_number,
            i.due_date,
            i.invoice_date,
            i.subtotal,
            i.tax_rate,
            i.total,
            i.payment_status,
            c1.customer_id AS bill_to_id,
            c1.name AS bill_to_name,
            c2.customer_id AS bill_from_id,
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
        WHERE i.invoice_id = ?;
    `;
    db.query(query, [id], callback);
  },

  deleteInvoice: (id, callback) => {
    db.getConnection((err, connection) => {
      if (err) return callback(err);

      connection.beginTransaction((err) => {
        if (err) {
          connection.release();
          return callback(err);
        }

        // First delete invoice_items
        connection.query('DELETE FROM invoice_items WHERE invoice_id = ?', [id], (err) => {
          if (err) {
            return connection.rollback(() => {
              connection.release();
              callback(err);
            });
          }

          // Then delete the invoice
          connection.query('DELETE FROM invoices WHERE invoice_id = ?', [id], (err, result) => {
            if (err) {
              return connection.rollback(() => {
                connection.release();
                callback(err);
              });
            }

            connection.commit((err) => {
              if (err) {
                return connection.rollback(() => {
                  connection.release();
                  callback(err);
                });
              }
              connection.release();
              callback(null, result.affectedRows > 0);
            });
          });
        });
      });
    });
  },

  updateWithItems: (id, data, callback) => {
    const {
      bill_to_id,
      bill_from_id,
      due_date,
      invoice_date,
      subtotal,
      tax_rate,
      total,
      payment_id,
      term_id,
      payment_status,
      items,
    } = data;

    db.getConnection((err, connection) => {
      if (err) return callback(err);

      connection.beginTransaction((err) => {
        if (err) {
          connection.release();
          return callback(err);
        }

        // 1. Update invoice fields
        connection.query(
          `UPDATE invoices SET 
                    bill_to_id = ?, 
                    bill_from_id = ?, 
                    due_date = ?, 
                    invoice_date = ?, 
                    subtotal = ?, 
                    tax_rate = ?, 
                    total = ?, 
                    payment_id = ?, 
                    payment_status = ?,
                    term_id = ?
                 WHERE invoice_id = ?`,
          [
            bill_to_id,
            bill_from_id,
            due_date,
            invoice_date,
            subtotal,
            tax_rate,
            total,
            payment_id,
            payment_status,  
            term_id,         
            id,             
          ],
          (err) => {
            if (err) {
              return connection.rollback(() => {
                connection.release();
                callback(err);
              });
            }

            // 2. Delete existing items first (simple approach)
            connection.query('DELETE FROM invoice_items WHERE invoice_id = ?', [id], (err) => {
              if (err) {
                return connection.rollback(() => {
                  connection.release();
                  callback(err);
                });
              }

              if (!items || items.length === 0) {
                return connection.commit((err) => {
                  if (err) {
                    return connection.rollback(() => {
                      connection.release();
                      callback(err);
                    });
                  }
                  connection.release();
                  callback(null, { message: 'Invoice updated successfully' });
                });
              }

              // 3. Re-insert items
              const itemValues = items.map((item) => [
                id,
                item.description,
                item.price,
                item.quantity,
                item.total,
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

                  connection.commit((err) => {
                    if (err) {
                      return connection.rollback(() => {
                        connection.release();
                        callback(err);
                      });
                    }
                    connection.release();
                    callback(null, { message: 'Invoice updated successfully' });
                  });
                }
              );
            });
          }
        );
      });
    });
  },
};

module.exports = Invoice;
