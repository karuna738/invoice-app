const Invoice = require('../models/invoiceModel');

exports.createInvoice = (req, res) => {
  Invoice.createWithItems(req.body, (err, result) => {
    if (err) return res.status(500).json({ error: err });

    // Fetch the created invoice with its items
    Invoice.getInvoiceWithItems(result.invoiceId, (err2, results) => {
      if (err2) return res.status(500).json({ error: err2 });

      if (!results || results.length === 0) {
        return res.status(201).json(result); // fallback
      }

      const invoice = {
        invoice_id: results[0].invoice_id,
        invoice_number: results[0].invoice_number,
        due_date: results[0].due_date,
        invoice_date: results[0].invoice_date,
        subtotal: results[0].subtotal,
        tax_rate: results[0].tax_rate,
        total: results[0].total,
        bill_to_name: results[0].bill_to_name,
        bill_from_name: results[0].bill_from_name,
        payment_id: results[0].payment_id,
        term_id: results[0].term_id,
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

      res.status(201).json(invoice);
    });
  });
};

exports.getInvoices = (req, res) => {
  Invoice.getAll((err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
};

exports.getInvoiceItems = (req, res) => {
  const { id } = req.params;

  Invoice.getInvoiceWithItems(id, (err, results) => {
    if (err) return res.status(500).json({ error: err });

    if (results.length === 0) {
      return res.status(404).json({ message: 'Invoice not found' });
    }

    const firstRow = results[0];

    const invoice = {
      invoice_id: firstRow.invoice_id,
      invoice_number: firstRow.invoice_number,
      due_date: firstRow.due_date,
      invoice_date: firstRow.invoice_date,
      subtotal: firstRow.subtotal,
      tax_rate: firstRow.tax_rate,
      total: firstRow.total,
      bill_to_id: firstRow.bill_to_id,
      bill_to_name: firstRow.bill_to_name,
      bill_from_id: firstRow.bill_from_id,
      bill_from_name: firstRow.bill_from_name,
      payment_id: firstRow.payment_id,
      bank_name: firstRow.bank_name,
      account_number: firstRow.account_number,
      term_id: firstRow.term_id,
      terms: firstRow.terms,
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

    res.status(200).json(invoice);
  });
};

exports.deleteInvoiceItem = (req, res) => {
  const { id } = req.params;
  Invoice.deleteInvoice(id, (err, success) => {
    if (err) return res.status(500).json({ error: err });
    if (!success) {
      return res.status(404).json({ message: 'Invoice not found' });
    }
    res.status(200).json({ message: 'Invoice deleted successfully' });
  });
};

exports.updateInvoice = (req, res) => {
  const { id } = req.params;

  Invoice.updateWithItems(id, req.body, (err, result) => {
    if (err) return res.status(500).json({ error: err });

    // Return updated invoice with items
    Invoice.getInvoiceWithItems(id, (err2, results) => {
      if (err2) return res.status(500).json({ error: err2 });
      if (!results || results.length === 0) {
        return res.status(404).json({ message: 'Invoice not found after update' });
      }

      const invoice = {
        invoice_id: results[0].invoice_id,
        invoice_number: results[0].invoice_number,
        due_date: results[0].due_date,
        invoice_date: results[0].invoice_date,
        subtotal: results[0].subtotal,
        tax_rate: results[0].tax_rate,
        total: results[0].total,
        bill_to_id: results[0].bill_to_id,
        bill_to_name: results[0].bill_to_name,
        bill_from_id: results[0].bill_from_id,
        bill_from_name: results[0].bill_from_name,
        payment_id: results[0].payment_id,
        bank_name: results[0].bank_name,
        account_number: results[0].account_number,
        term_id: results[0].term_id,
        terms: results[0].terms,
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

      res.status(200).json(invoice);
    });
  });
};
