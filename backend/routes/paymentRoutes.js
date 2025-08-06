const express = require('express');
const { addPaymentMethod, getPaymentsByInvoice } = require('../controllers/paymentController');
const router = express.Router();

router.post('/', addPaymentMethod);
router.get('/', getPaymentsByInvoice);

module.exports = router;
