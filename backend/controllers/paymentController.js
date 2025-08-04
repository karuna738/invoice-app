const db = require('../config/db');

exports.addPaymentMethod = (req, res) => {
    const { invoice_id, bank_name, account_number } = req.body;

    db.query(
        'INSERT INTO payment_methods (invoice_id, bank_name, account_number) VALUES (?, ?, ?)',
        [invoice_id, bank_name, account_number],
        (err, result) => {
            if (err) return res.status(500).json({ error: err });
            res.status(201).json({ message: 'Payment method added', paymentId: result.insertId });
        }
    );
};

exports.getPaymentsByInvoice = (req, res) => {
    const { invoice_id } = req.params;
    db.query('SELECT * FROM payment_methods WHERE invoice_id = ?', [invoice_id], (err, results) => {
        if (err) return res.status(500).json({ error: err });
        res.json(results);
    });
};
