const Customer = require('../models/customerModel');

exports.createCustomer = (req, res) => {
    Customer.create(req.body, (err, result) => {
        if (err) return res.status(500).json({ error: err });
        res.status(201).json({ message: 'Customer created', customerId: result.insertId });
    });
};

exports.getCustomers = (req, res) => {
    Customer.getAll((err, results) => {
        if (err) return res.status(500).json({ error: err });
        res.json(results);
    });
};
