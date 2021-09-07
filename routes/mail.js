const express = require('express');
const router = express.Router();
const sendMail = require('../controlers/mail');

router.get('/', sendMail.sendMailInside);
module.exports = router;