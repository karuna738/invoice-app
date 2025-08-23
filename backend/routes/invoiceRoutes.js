const express = require('express');
const { createInvoice, getInvoices, getInvoiceItems, deleteInvoiceItem, updateInvoice } = require('../controllers/invoiceController');
const router = express.Router();

router.post('/', createInvoice);
router.get('/', getInvoices);
router.get('/:id', getInvoiceItems);
router.delete('/:id', deleteInvoiceItem);
router.put('/:id', updateInvoice);

module.exports = router;
