const express = require('express');

const router = express.Router();

const userControler = require('../controlers/users');
const auth = require('../middleware/auth');

router.post('/signup', userControler.createAccount);
router.post('/login', userControler.login);
router.get('/', userControler.getAccount);
router.get('/:id', userControler.getOneAccount);
router.put('/:id', auth, userControler.putAccount);
router.delete('/:id', auth, userControler.deleteAccount);


module.exports = router;