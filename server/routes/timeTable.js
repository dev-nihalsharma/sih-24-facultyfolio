const express = require('express');
const router = express.Router();
const {fetchTimeTable,createTimeTable,updateTimeTable,deleteTimeTable,getTimeTableById,fetchDailyTimeTable} = require('../controllers/timeTable');
router.post('/',fetchTimeTable)
router.post('/daily',fetchDailyTimeTable)
router.post('/add',createTimeTable)
router.post('/:id',getTimeTableById)
router.post('/update/:id',updateTimeTable)
router.post('/delete/:id',deleteTimeTable)
module.exports = router;
exports.default = router;
