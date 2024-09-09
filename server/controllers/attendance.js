const Attendance=require('../models/attendance');
const crypto= require('crypto');
const TimeTable = require('../models/timeTable');
const Faculty = require('../models/faculty');
const Event = require('../models/event');
const addAttendanceRecord = async (req, res) => {
  try {
    const { _orgId, _facultyId, date, day } = req.body;
    const attendanceRecords = await Attendance.findAll({
      where: { _facultyId, date },
    });
    const timeTableRecords = await TimeTable.findAll({
      where: {
        day,
        _facultyId,
      },
    });
    const eventRecords = await Event.findAll({
      where: {
        date,
        assignedFaculty: _facultyId,
      },
    });
    if (!timeTableRecords.length && !eventRecords.length) {
      return res.status(404).json({ error: 'No timetable or event found for today with the given facultyId' });
    }
    const newTimeTableRecords = timeTableRecords.filter(timeTableRecord => 
      !attendanceRecords.some(attendance => attendance._timeTableId === timeTableRecord._id)
    );
    const newEventRecords = eventRecords.filter(eventRecord => 
      !attendanceRecords.some(attendance => attendance._eventId === eventRecord._id)
    );

    for (const timeTableRecord of newTimeTableRecords) {
      await Attendance.create({
        _id: crypto.randomBytes(8).toString('hex'),
        _orgId,
        _timeTableId: timeTableRecord._id,
        _eventId: null,
        _facultyId,
        date,
        isPresent: false,
      });
    }
    for (const eventRecord of newEventRecords) {
      await Attendance.create({
        _id: crypto.randomBytes(8).toString('hex'),
        _orgId,
        _timeTableId: null,
        _eventId: eventRecord._id,
        _facultyId,
        date,
        isPresent: false,
      });
    }

    res.status(201).json({ success: 'Attendance records updated successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error adding attendance records: ' + error });
  }
};
 

const fetchAttendanceRecords = async (req, res) => {
    try {
        const { _facultyId,date } = req.body;


        const attendanceRecords = await Attendance.findAll({
            where:{_facultyId,date},
            include: [
                { model: Faculty, as: 'faculty', attributes: ['fullName'] },
                { model: TimeTable, as: 'timeTable', attributes: ['day', 'startTime', 'endTime', 'room'] },
                { model: Event, as: 'event', attributes: ['name', 'description', 'date', 'venue'] }
            ]
        });

        res.status(200).json(attendanceRecords);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching attendance records:'+error });
    }
};

const markAttendanceRecord = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await Attendance.update(
            { isPresent:true },
            { where: { _id: id } }
        );

        if (result[0] === 0) {
            return res.status(404).json({ error: 'Attendance record not found' });
        }

        res.status(200).json({ success: 'Attendance record updated successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Error updating attendance record:'+error });
    }
};

const deleteAttendanceRecord = async (req, res) => {
    const { id } = req.params;

    try {
        const result = await Attendance.destroy({ where: { _id: id } });

        if (result === 0) {
            return res.status(404).json({ error: 'Attendance record not found' });
        }

        res.status(200).json({ success: 'Attendance record deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Error deleting attendance record:'+error });
    }
};

module.exports = {
    addAttendanceRecord,
    fetchAttendanceRecords,
    markAttendanceRecord,
    deleteAttendanceRecord
};

