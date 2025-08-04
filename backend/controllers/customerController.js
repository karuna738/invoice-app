const db = require('../config/db');

// Create Customer
exports.createCustomer = (req, res) => {
    const { name, company_name, address, city, state, zip_code, email, phone, type } = req.body;

    db.query(
        'INSERT INTO customers (name, company_name, address, city, state, zip_code, email, phone, type) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
        [name, company_name, address, city, state, zip_code, email, phone, type],
        (err, result) => {
            if (err) return res.status(500).json({ error: err });
            res.status(201).json({ message: 'Customer created', customerId: result.insertId });
        }
    );
};

// Get All Customers
exports.getCustomers = (req, res) => {
    db.query('SELECT * FROM customers', (err, results) => {
        if (err) return res.status(500).json({ error: err });
        res.json(results);
    });
};
