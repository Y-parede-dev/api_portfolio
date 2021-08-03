const express = require('express');
const router = express.Router();
const projectCtrl = require('../controlers/projects');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer.project')

router.post('/', multer, projectCtrl.postNewProjecs);
router.get('/', projectCtrl.getAllProjects);
router.get('/:id', projectCtrl.getOneProject);
router.put('/:id', multer, projectCtrl.uppdateProject);

module.exports = router;