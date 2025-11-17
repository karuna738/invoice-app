const Terms = require('../models/termsModel');

// CREATE
exports.addTerms = (req, res) => {
  const user_id = req.body.user_id;
  if (!user_id) {
    return res.status(400).json({ message: "user_id required" });
  }

  Terms.add({ ...req.body, user_id }, (err, result) => {
    if (err) return res.status(500).json({ error: err });

    res.status(201).json({
      message: "Terms added successfully",
      termId: result.insertId,
    });
  });
};

// GET ALL for user
exports.getTermsByUser = (req, res) => {
  const { user_id } = req.query;
  if (!user_id) return res.status(400).json({ message: "user_id required" });

  Terms.getByUser(user_id, (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
};

// DELETE
exports.deleteTerms = (req, res) => {
  const { id } = req.params;
  const { user_id } = req.query;

  Terms.delete(id, user_id, (err, result) => {
    if (err) return res.status(500).json({ error: err });

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Term not found or not owned by user" });
    }

    res.json({ message: "Term deleted successfully" });
  });
};

// UPDATE
exports.updateTerms = (req, res) => {
  const { id } = req.params;
  const { user_id } = req.body;

  Terms.update(id, req.body, user_id, (err, result) => {
    if (err) return res.status(500).json({ error: err });

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Term not found or not owned by user" });
    }

    res.json({ message: "Term updated successfully" });
  });
};
