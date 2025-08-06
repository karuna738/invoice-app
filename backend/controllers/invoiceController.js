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
                invoice_items: results
                    .filter(row => row.item_id)
                    .map(row => ({
                        item_id: row.item_id,
                        description: row.description,
                        price: row.price,
                        quantity: row.quantity,
                        item_total: row.item_total
                    }))
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

        const invoice = {
            invoice_id: results[0].invoice_id,
            invoice_number: results[0].invoice_number,
            due_date: results[0].due_date,
            invoice_date: results[0].invoice_date,
            subtotal: results[0].subtotal,
            tax_rate: results[0].tax_rate,
            total: results[0].total,
            bill_to_id: results[0].bill_to_id,
            bill_from_id: results[0].bill_from_id,
            invoice_items: results
                .filter(row => row.item_id)
                .map(row => ({
                    item_id: row.item_id,
                    description: row.description,
                    price: row.price,
                    quantity: row.quantity,
                    item_total: row.item_total
                }))
        };


        res.status(200).json(invoice);
    });
};
