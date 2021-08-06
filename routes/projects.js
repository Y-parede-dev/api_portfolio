const express = require('express');
const router = express.Router();
const projectCtrl = require('../controlers/projects');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer.project')

router.post('/', auth, multer, projectCtrl.postNewProjecs);
router.get('/', projectCtrl.getAllProjects);
router.get('/:id', projectCtrl.getOneProject);
router.put('/:id', auth, multer, projectCtrl.uppdateProject);
router.delete('/:id', auth, multer, projectCtrl.deleteProject);


module.exports = router;