const express = require('express');
const { addTerms, getTermsByInvoice, deleteTerms } = require('../controllers/termsController');
const router = express.Router();

router.post('/', addTerms);
router.get('/', getTermsByInvoice);
router.delete('/:id', deleteTerms);

module.exports = router;
