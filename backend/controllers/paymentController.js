const Payment = require('../models/paymentModel');
const Invoice = require('../models/invoiceModel');

exports.addPaymentMethod = (req, res) => {
  const { user_id } = req.body;

  if (!user_id)
    return res.status(400).json({ message: "user_id is required" });

  Payment.add(req.body, (err, result) => {
    if (err) return res.status(500).json({ error: err });

    res.status(201).json({
      message: 'Payment method added',
      paymentId: result.insertId,
    });
  });
};

exports.getPayments = (req, res) => {
  const { user_id } = req.query;

  Payment.getAll(user_id, (err, results) => {
    if (err) return res.status(500).json({ error: err });

    res.json(results);
  });
};

// 🔥 Correct way to fetch payment method for an invoice
exports.getPaymentsByInvoice = (req, res) => {
  const { invoice_id } = req.params;
  const { user_id } = req.query;

  // Step 1: Fetch invoice
  Invoice.getInvoice(invoice_id, user_id, (err, invoiceResult) => {
    if (err) return res.status(500).json({ error: err });

    if (invoiceResult.length === 0)
      return res.status(404).json({ message: 'Invoice not found' });

    const payment_id = invoiceResult[0].payment_id;

    // Step 2: Fetch payment method
    Payment.getById(payment_id, user_id, (err, payment) => {
      if (err) return res.status(500).json({ error: err });

      res.json(payment);
    });
  });
};

exports.deletePayment = (req, res) => {
  const { id } = req.params;
  const { user_id } = req.query;

  Payment.delete(id, user_id, (err, result) => {
    if (err) return res.status(500).json({ error: err });

    if (result.affectedRows === 0)
      return res.status(404).json({ message: 'Payment Not Found' });

    res.json({ message: 'Payment deleted successfully' });
  });
};

exports.updatePayment = (req, res) => {
  const { id } = req.params;

  Payment.update(id, req.body, (err, result) => {
    if (err) return res.status(500).json({ error: err });

    if (result.affectedRows === 0)
      return res.status(404).json({ message: 'Payment Not Found' });

    res.json({ message: 'Payment updated successfully' });
  });
};

