const express = require('express');
const { createInvoice, getInvoices, getInvoiceItems, deleteInvoiceItem } = require('../controllers/invoiceController');
const router = express.Router();

router.post('/', createInvoice);
router.get('/', getInvoices);
router.get('/:id', getInvoiceItems);
router.delete('/:id', deleteInvoiceItem);

module.exports = router;
