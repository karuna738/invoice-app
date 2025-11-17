const Invoice = require('../models/invoiceModel');

// CREATE invoice
exports.createInvoice = (req, res) => {
  const user_id = req.body.user_id; // ⬅⬅⬅ added

  if (!user_id) {
    return res.status(400).json({ message: 'user_id is required' });
  }

  const payload = { ...req.body, user_id };

  Invoice.createWithItems(payload, (err, result) => {
    if (err) return res.status(500).json({ error: err });

    Invoice.getInvoiceWithItems(result.invoiceId, user_id, (err2, results) => {
      if (!results || results.length === 0) {
        return res.status(201).json(result);
      }

      const invoice = formatInvoice(results);
      res.status(201).json(invoice);
    });
  });
};

// GET all invoices for specific user
exports.getInvoices = (req, res) => {
  const user_id = req.query.user_id; // ⬅⬅⬅ added
  if (!user_id) return res.status(400).json({ message: 'user_id required' });

  Invoice.getAll(user_id, (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
};

// GET a specific invoice with items
exports.getInvoiceItems = (req, res) => {
  const user_id = req.query.user_id; // ⬅⬅⬅ added
  const { id } = req.params;

  Invoice.getInvoiceWithItems(id, user_id, (err, results) => {
    if (!results || results.length === 0) {
      return res.status(404).json({ message: 'Invoice not found' });
    }

    const invoice = formatInvoice(results);
    res.status(200).json(invoice);
  });
};

// DELETE an invoice (user protected)
exports.deleteInvoiceItem = (req, res) => {
  const user_id = req.query.user_id; // ⬅⬅⬅ added
  const { id } = req.params;

  Invoice.deleteInvoice(id, user_id, (err, success) => {
    if (!success)
      return res.status(404).json({ message: 'Invoice not found' });

    res.status(200).json({ message: 'Invoice deleted successfully' });
  });
};

// UPDATE invoice
exports.updateInvoice = (req, res) => {
  const user_id = req.body.user_id; // ⬅⬅⬅ added
  const { id } = req.params;

  Invoice.updateWithItems(id, { ...req.body, user_id }, (err) => {
    // Get updated invoice
    Invoice.getInvoiceWithItems(id, user_id, (err2, results) => {
      const invoice = formatInvoice(results);
      res.status(200).json(invoice);
    });
  });
};

// helper: format invoice data
function formatInvoice(results) {
  const first = results[0];

  return {
    invoice_id: first.invoice_id,
    invoice_number: first.invoice_number,
    due_date: first.due_date,
    invoice_date: first.invoice_date,
    subtotal: first.subtotal,
    tax_rate: first.tax_rate,
    total: first.total,
    bill_to_id: first.bill_to_id,
    bill_to_name: first.bill_to_name,
    bill_from_id: first.bill_from_id,
    bill_from_name: first.bill_from_name,
    payment_id: first.payment_id,
    bank_name: first.bank_name,
    account_number: first.account_number,
    term_id: first.term_id,
    terms: first.terms,
    payment_status: first.payment_status,
    invoice_items: results
      .filter((row) => row.item_id)
      .map((row) => ({
        item_id: row.item_id,
        description: row.description,
        price: row.price,
        quantity: row.quantity,
        item_total: row.item_total,
      })),
  };
}
