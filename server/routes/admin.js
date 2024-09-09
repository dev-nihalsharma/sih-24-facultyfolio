const express = require('express');
const router = express.Router();
const { getAdmin,updateAdmin,activatefaculty,deactivateFaculty} = require('../controllers/admin');

router.post('/admin', getAdmin);
router.post('/editadmin', updateAdmin);
router.post('/activatefaculty/:id', activatefaculty);
router.post('/deactivatefaculty/:id', deactivateFaculty);

module.exports = router;