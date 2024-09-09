const {addEvent,fetchEvents,updateEvents,deleteEvents} = require('../controllers/event');
const express = require('express');
const router = express.Router();
router.post('/',fetchEvents)
router.post('/add',addEvent)
router.post('/update/:id',updateEvents)
router.post('/delete/:id',deleteEvents)
module.exports = router;
