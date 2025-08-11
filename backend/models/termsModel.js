const db = require('../config/db');

exports.add = (data, callback) => {
    const { terms } = data;
    db.query(
        'INSERT INTO terms_conditions (terms) VALUES (?)',
        [terms],
        callback
    );
};

exports.getByInvoice = (invoice_id, callback) => {
    db.query(
        'SELECT * FROM terms_conditions',
        callback
    );
};

exports.delete = (id, callback) => {
    db.query(
        'DELETE FROM terms_conditions WHERE term_id = ?',
        [id],
        callback
    );
};
