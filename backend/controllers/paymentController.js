const Payment = require('../models/paymentModel');

exports.addPaymentMethod = (req, res) => {
    Payment.add(req.body, (err, result) => {
        if (err) return res.status(500).json({ error: err });
        res.status(201).json({
            message: 'Payment method added',
            paymentId: result.insertId
        });
    });
};

exports.getPaymentsByInvoice = (req, res) => {
    const { invoice_id } = req.params; // expecting /payments/:invoice_id
    Payment.getByInvoice(invoice_id, (err, results) => {
        if (err) return res.status(500).json({ error: err });
        res.json(results);
    });
};

exports.deletePayment = (req, res) => {
    const { id } = req.params;
    Payment.delete(id, (err, result) => {
        if (err) return res.status(500).json({ error: err });
        res.status(200).json({
            message: 'Payment deleted successfully',
            deleted: result.affectedRows > 0
        });
    });
};

exports.updatePayment = (req, res) => {
    const { id } = req.params;
    Payment.update(id, req.body, (err, result) => {
        if (err) return res.status(500).json({ error: err });

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Payment method not found' });
        }

        res.status(200).json({
            message: 'Payment method updated successfully',
            updated: true
        });
    });
};

