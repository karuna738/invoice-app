const express = require('express');
const {
  addTerms,
  getTermsByUser,
  deleteTerms,
  updateTerms,
} = require('../controllers/termsController');

const router = express.Router();

router.post('/', addTerms);
router.get('/', getTermsByUser);
router.delete('/:id', deleteTerms);
router.put('/:id', updateTerms);
module.exports = router;
