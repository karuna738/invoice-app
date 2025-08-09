const db = require('../config/db');

exports.addTerms = (req, res) => {
    const { invoice_id, terms } = req.body;

    db.query(
        'INSERT INTO terms_conditions (invoice_id, terms) VALUES (?, ?)',
        [invoice_id, terms],
        (err, result) => {
            if (err) return res.status(500).json({ error: err });
            res.status(201).json({ message: 'Terms added', termId: result.insertId });
        }
    );
};

exports.getTermsByInvoice = (req, res) => {
    db.query('SELECT * FROM terms_conditions', (err, results) => {
        if (err) return res.status(500).json({ error: err });
        res.json(results);
    });
};
