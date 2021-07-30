const express = require('express');
const router = express.Router();
const projectCtrl = require('../controlers/projects');
const auth = require('../middleware/auth');

router.get('/', projectCtrl.getAllProjects)
router.get('/:id', projectCtrl.getAllProjects)

module.exports = router;