const express = require('express');
const { addPaymentMethod, getPaymentsByInvoice } = require('../controllers/paymentController');
const router = express.Router();

router.post('/', addPaymentMethod);
router.get('/:invoice_id', getPaymentsByInvoice);

module.exports = router;
