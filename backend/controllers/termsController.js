const Terms = require('../models/termsModel');

exports.addTerms = (req, res) => {
  Terms.add(req.body, (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.status(201).json({
      message: 'Terms added',
      termId: result.insertId,
    });
  });
};

exports.getTermsByInvoice = (req, res) => {
  const { invoice_id } = req.params;
  Terms.getByInvoice(invoice_id, (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
};

exports.deleteTerms = (req, res) => {
  const { id } = req.params;
  Terms.delete(id, (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.status(200).json({
      message: 'Terms deleted successfully',
      deleted: result.affectedRows > 0,
    });
  });
};

exports.updateTerms = (req, res) => {
  const { id } = req.params;
  Terms.update(id, req.body, (err, result) => {
    if (err) return res.status(500).json({ error: err });

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Term not found' });
    }

    res.status(200).json({
      message: 'Term updated successfully',
      updated: true,
    });
  });
};
