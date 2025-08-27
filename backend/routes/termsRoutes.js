const express = require('express');
const { addTerms, getTermsByInvoice, deleteTerms, updateTerms } = require('../controllers/termsController');
const router = express.Router();

router.post('/', addTerms);
router.get('/', getTermsByInvoice);
router.delete('/:id', deleteTerms);
router.put('/:id', updateTerms);


module.exports = router;
