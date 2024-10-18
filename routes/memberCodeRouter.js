const express = require('express');
const router = express.Router();
const memberCodeController = require('../controllers/memberCodeController');

router.get('/codes', memberCodeController.getMemberCodes);

module.exports = router;
