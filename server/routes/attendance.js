const express = require('express');
const router = express.Router();
const {addAttendanceRecord,fetchAttendanceRecords,markAttendanceRecord,deleteAttendanceRecord} = require('../controllers/attendance'); // Import the attendance controller

router.post('/add',addAttendanceRecord);
router.post('/', fetchAttendanceRecords);
router.post('/update/:id', markAttendanceRecord);
router.post('/delete/:id', deleteAttendanceRecord);

module.exports = router;
