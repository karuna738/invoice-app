const Payment = require('../models/paymentModel');

exports.addPaymentMethod = (req, res) => {
    Payment.add(req.body, (err, result) => {
        if (err) return res.status(500).json({ error: err });
        res.status(201).json({ message: 'Payment method added', paymentId: result.insertId });
    });
};

exports.getPaymentsByInvoice = (req, res) => {
    Payment.getByInvoice(req.params.invoice_id, (err, results) => {
        if (err) return res.status(500).json({ error: err });
        res.json(results);
    });
};
