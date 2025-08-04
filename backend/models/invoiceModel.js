const db = require('../config/db');

const Invoice = {
    createWithItems: (data, callback) => {
        const { bill_to_id, bill_from_id, due_date, invoice_date, subtotal, tax_rate, total, items } = data;

        db.getConnection((err, connection) => {
            if (err) return callback(err);

            connection.beginTransaction(err => {
                if (err) {
                    connection.release();
                    return callback(err);
                }

                connection.query('SELECT COUNT(*) AS count FROM invoices', (err, result) => {
                    if (err) {
                        return connection.rollback(() => {
                            connection.release();
                            callback(err);
                        });
                    }

                    const count = result[0].count + 1;
                    const invoice_number = `INV-${String(count).padStart(4, '0')}`;

                    connection.query(
                        'INSERT INTO invoices (invoice_number, bill_to_id, bill_from_id, due_date, invoice_date, subtotal, tax_rate, total) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
                        [invoice_number, bill_to_id, bill_from_id, due_date, invoice_date, subtotal, tax_rate, total],
                        (err, invoiceResult) => {
                            if (err) {
                                return connection.rollback(() => {
                                    connection.release();
                                    callback(err);
                                });
                            }

                            const invoiceId = invoiceResult.insertId;

                            if (!items || items.length === 0) {
                                connection.commit(err => {
                                    if (err) {
                                        return connection.rollback(() => {
                                            connection.release();
                                            callback(err);
                                        });
                                    }
                                    connection.release();
                                    callback(null, { message: 'Invoice created successfully', invoiceId, invoice_number });
                                });
                                return;
                            }

                            const itemQueries = items.map(item => [
                                invoiceId,
                                item.description,
                                item.price,
                                item.quantity,
                                item.total
                            ]);

                            connection.query(
                                'INSERT INTO invoice_items (invoice_id, description, price, quantity, total) VALUES ?',
                                [itemQueries],
                                (err) => {
                                    if (err) {
                                        return connection.rollback(() => {
                                            connection.release();
                                            callback(err);
                                        });
                                    }

                                    connection.commit(err => {
                                        if (err) {
                                            return connection.rollback(() => {
                                                connection.release();
                                                callback(err);
                                            });
                                        }

                                        connection.release();
                                        callback(null, { message: 'Invoice created successfully', invoiceId, invoice_number });
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
             JOIN customers c2 ON i.bill_from_id = c2.customer_id`,
            callback
        );
    }
};

module.exports = Invoice;
