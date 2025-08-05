const express = require('express');
const { createInvoice, getInvoices, getInvoiceItems } = require('../controllers/invoiceController');
const router = express.Router();

router.post('/', createInvoice);
router.get('/', getInvoices);
router.get('/:id', getInvoiceItems);

module.exports = router;
