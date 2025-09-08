const express = require('express');
const {
  addPaymentMethod,
  getPaymentsByInvoice,
  deletePayment,
  updatePayment,
} = require('../controllers/paymentController');
const router = express.Router();

router.post('/', addPaymentMethod);
router.get('/', getPaymentsByInvoice);
router.delete('/:id', deletePayment);
router.put('/:id', updatePayment);

module.exports = router;
