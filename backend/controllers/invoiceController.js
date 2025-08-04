const Invoice = require('../models/invoiceModel');

exports.createInvoice = (req, res) => {
    Invoice.createWithItems(req.body, (err, result) => {
        if (err) return res.status(500).json({ error: err });
        res.status(201).json(result);
    });
};

exports.getInvoices = (req, res) => {
    Invoice.getAll((err, results) => {
        if (err) return res.status(500).json({ error: err });
        res.json(results);
    });
};
