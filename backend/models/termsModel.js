const db = require('../config/db');

exports.add = (data, callback) => {
  const { terms, user_id } = data;

  db.query(
    'INSERT INTO terms_conditions (terms, user_id) VALUES (?, ?)',
    [terms, user_id],
    callback
  );
};

// Fetch only logged-in user's terms
exports.getByUser = (user_id, callback) => {
  db.query(
    'SELECT * FROM terms_conditions WHERE user_id = ? ORDER BY term_id DESC',
    [user_id],
    callback
  );
};

// Delete term only if user owns it
exports.delete = (id, user_id, callback) => {
  db.query(
    'DELETE FROM terms_conditions WHERE term_id = ? AND user_id = ?',
    [id, user_id],
    callback
  );
};

// Update only user's own term
exports.update = (id, data, user_id, callback) => {
  const { terms } = data;

  db.query(
    'UPDATE terms_conditions SET terms = ? WHERE term_id = ? AND user_id = ?',
    [terms, id, user_id],
    callback
  );
};
