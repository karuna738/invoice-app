const express = require("express");
const {
  addPaymentMethod,
  getPayments,
  getPaymentsByInvoice,
  deletePayment,
  updatePayment
} = require("../controllers/paymentController");

const router = express.Router();
router.post("/", addPaymentMethod);
router.get("/", getPayments);
router.get("/:invoice_id", getPaymentsByInvoice);
router.delete("/:id", deletePayment);
router.put("/:id", updatePayment);
module.exports = router;
