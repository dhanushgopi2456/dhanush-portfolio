const express = require('express');
const router = express.Router();
const { getCertifications } = require('../controllers/certificationController');

router.get('/', getCertifications);

module.exports = router;
