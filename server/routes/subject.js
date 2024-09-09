const express = require('express');
const router = express.Router();
const{ createSubject,getAllSubjects,getSubjectById,updateSubject,deleteSubject}=require('../controllers/subject');
router.post('/', getAllSubjects);
router.post('/add', createSubject);
router.post('/:id', getSubjectById);
router.post('/update/:id', updateSubject);
router.post('/delete/:id', deleteSubject);
module.exports = router;