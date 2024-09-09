const express = require('express');
const router = express.Router();
const {
  getAllFaculty,
  getFacultyById,
  updateFaculty,
  markFacultyAsDeleted,
  getFacultyAppraisals,
} = require('../controllers/faculty');

router.post('/faculty', getAllFaculty);
router.post('/faculty/appraisal', getFacultyAppraisals);
router.post('/faculty/:id', getFacultyById);
router.post('/updatefaculty/:id', updateFaculty);
router.post('/deletefaculty/:id', markFacultyAsDeleted);

module.exports = router;
