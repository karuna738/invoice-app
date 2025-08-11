const express = require('express');
const { addPaymentMethod, getPaymentsByInvoice, deletePayment } = require('../controllers/paymentController');
const router = express.Router();

router.post('/', addPaymentMethod);
router.get('/', getPaymentsByInvoice);
router.delete('/:id', deletePayment);

module.exports = router;
