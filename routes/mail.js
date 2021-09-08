const express = require('express');
const router = express.Router();
const sendMail = require('../controlers/mail');

router.post('/', sendMail.sendMailInside);
module.exports = router;