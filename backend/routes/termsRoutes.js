const express = require('express');
const { addTerms, getTermsByInvoice } = require('../controllers/termsController');
const router = express.Router();

router.post('/', addTerms);
router.get('/', getTermsByInvoice);

module.exports = router;
