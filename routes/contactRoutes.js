const express = require('express');
const router = express.Router();
const { validateContact, submitContact } = require('../controllers/contactController');

router.post('/', validateContact, submitContact);

module.exports = router;
