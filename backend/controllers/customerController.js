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

exports.deleteCustomer = (req, res) => {
  const { id } = req.params;
  Customer.deleteCustomer(id, (err, success) => {
    if (err) return res.status(500).json({ error: err });
    if (!success) {
      return res.status(404).json({ message: 'Customer not found' });
    }
    res.status(200).json({ message: 'Customer deleted successfully' });
  });
};

exports.updateCustomer = (req, res) => {
  const { id } = req.params;

  Customer.update(id, req.body, (err, success) => {
    if (err) return res.status(500).json({ error: err });
    if (!success) {
      return res.status(404).json({ message: 'Customer not found' });
    }
    res.status(200).json({ message: 'Customer updated successfully' });
  });
};
