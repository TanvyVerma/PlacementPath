const express = require('express');
const router = express.Router();
const {
  getCompanies,
  getCompanyAnalysis
} = require('../controllers/companyController');

router.get('/', getCompanies);
router.get('/:company/analysis', getCompanyAnalysis);

module.exports = router;