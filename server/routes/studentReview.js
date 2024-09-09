const express = require('express');
const router = express.Router();
const {addReview, fetchReviews,fetchFaculty,fetchOrg,fetchSubject} = require('../controllers/studentReview');

// Route to add a new review
router.post('/', addReview);
// Route to fetch all reviews for a specific faculty member
router.post('/org',fetchOrg);
router.post('/faculty',fetchFaculty);
router.post('/subject',fetchSubject)
router.post('/:facultyId', fetchReviews);


module.exports = router;