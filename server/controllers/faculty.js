// facultyController.js
const Faculty = require('../models/faculty');
const University = require('../models/university');
const Subject = require('../models/subject');
const Event = require('../models/event');
const dotenv = require('dotenv');
const studentReview = require('../models/studentReview');
const { getNumberOfProjectsFromGScholar } = require('../utils/googleScholar');
const { generateFacultyAppraisal, predictFacultyAppraisal } = require('../utils/mlIntigration');
const Attendance = require('../models/attendance');
const axios = require('axios');
dotenv.config();

// Read all faculty members
const getAllFaculty = async (req, res) => {
  const { _orgId } = req.body;
  try {
    const facultyList = await Faculty.findAll({
      where: { _orgId, isDeleted: false },
      include: {
        model: Subject,
        attributes: ['name', 'code'],
        as: 'subject',
      },
    });

    if (!facultyList) {
      return res.status(404).json({ error: 'Faculty list not found' });
    }
    facultyList.forEach((faculty) => {
      delete faculty.dataValues.password;
      delete faculty.dataValues.isDeleted;
    });
    res.status(200).json(facultyList);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching faculty list :' + error });
  }
};

// Read a single faculty member by ID
const getFacultyById = async (req, res) => {
  const _id = req.params.id;

  try {
    const faculty = await Faculty.findOne({
      where: { _id,isDeleted: false },
      include: {
        model: Subject,
        attributes: ['name', 'code'],
        as: 'subject',
      },
    });
    if (!faculty) {
      return res.status(404).json({ success: 'Faculty member not found' });
    }
    delete faculty.dataValues.password;
    delete faculty.dataValues.isDeleted;
    const response = await axios.get(faculty.scholarAccount);
    const jsonData = response.data;
    res.status(200).json({ ...faculty.dataValues,scholarData:jsonData });
  } catch (error) {
    res.status(500).json({ error: 'Error fetching faculty member : ' + error });
  }
};

// Get faculty appraisal by ID
const facultyAppraisal = async (id) => {
  const faculty = await Faculty.findByPk(id);
  const numberProjects = await getNumberOfProjectsFromGScholar(faculty.dataValues.scholarAccount);
  const numberEvent = await Event.count({ where: { assignedfaculty: id } });
  const numberReview = await studentReview.count({ where: { _facultyId: id } });
  const totalWorkDays = await Attendance.count({ where: { _facultyId: id } });
  const totalPresentDays = await Attendance.count({ where: { _facultyId: id, isPresent: true } });
  const attendance = totalWorkDays == 0 ? 0 : (totalPresentDays / totalWorkDays) * 100;

  const appraisal = await predictFacultyAppraisal(
    parseInt(faculty.dataValues.experience),
    numberProjects,
    numberEvent,
    numberReview,
    attendance
  );

  return appraisal;
};

const getFacultyAppraisals = async (req, res) => {
  console.log(req.body);
  const { _orgId } = req.body;

  try {
    const facultyList = await Faculty.findAll({
      where: { _orgId, isDeleted: false },
    });

    if (!facultyList || facultyList.length === 0) {
      return res.status(404).json({ error: 'Faculty list not found' });
    }
    const updatedFacultyList = await Promise.all(
      facultyList.map(async (faculty) => {
        delete faculty.dataValues.password;
        delete faculty.dataValues.isDeleted;
        const appraisal = await facultyAppraisal(faculty.dataValues._id);
        return {
          ...faculty.dataValues,
          appraisal,
        };
      })
    );
    res.status(200).json(updatedFacultyList);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching faculty appraisals: ' + error });
  }
};

// Update a faculty member by ID
const updateFaculty = async (req, res) => {
  try {
    const updatedFaculty = await Faculty.update(req.body, {
      where: { _id: req.params.id },
    });
    if (updatedFaculty[0] === 0) {
      // Check if any rows were updated
      return res.status(404).json({ error: 'Faculty member not found' });
    }
    res.status(200).json({ success: 'Faculty member updated successfully' });
  } catch (error) {
    res.status(400).json({ error: 'Error updating faculty : ' + error });
  }
};

// Delete a faculty member by ID
const markFacultyAsDeleted = async (req, res) => {
  try {
    const [updated] = await Faculty.update({ isDeleted: true }, { where: { id: req.params.id } });

    if (updated === 0) {
      return res.status(404).json({ error: 'Faculty member not found' });
    }

    res.status(200).json({ success: 'Faculty member marked as deleted successfully' });
  } catch (error) {
    console.error('Error marking faculty as deleted:' + error); // Log error for debugging
    res.status(500).json({ error: 'Error marking faculty as deleted' });
  }
};

module.exports = {
  getAllFaculty,
  getFacultyById,
  getFacultyAppraisals,
  updateFaculty,
  markFacultyAsDeleted,
};
