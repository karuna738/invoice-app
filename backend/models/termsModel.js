const Terms = require('../models/termsModel');

exports.addTerms = (req, res) => {
    Terms.add(req.body, (err, result) => {
        if (err) return res.status(500).json({ error: err });
        res.status(201).json({ message: 'Terms added', termId: result.insertId });
    });
};

exports.getTermsByInvoice = (req, res) => {
    Terms.getByInvoice(req.params.invoice_id, (err, results) => {
        if (err) return res.status(500).json({ error: err });
        res.json(results);
    });
};
