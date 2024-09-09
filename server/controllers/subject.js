const Subject = require('../models/subject');
const dotenv = require('dotenv');
const crypto = require('crypto');
dotenv.config();

// Create a new subject
const createSubject = async (req, res) => {
    try {
        const _subId = crypto.randomBytes(8).toString('hex');
        const { _orgId,name,code,description } = req.body;
        const newSubject = await Subject.create({ _id:_subId,_orgId,name,code,description });
        res.status(201).json({success: 'Subject created successfully'});
    } catch (error) {
        res.status(400).json({ error: 'Error creating subject :'+ error });
    }
};

// Read all subjects
const getAllSubjects = async (req, res) => {
    const {_orgId} = req.body;
    try {
        const subjects = await Subject.findAll({where: { _orgId }});
        res.status(200).json(subjects);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching subjects :'+error});
    }
};

// Read a single subject by ID
const getSubjectById = async (req, res) => {
    try {
        const subject = await Subject.findByPk(req.params.id);
        if (!subject) {
            return res.status(404).json({ error: 'Subject not found' });
        }
        res.status(200).json(subject);
    } catch (err) {
        res.status(500).json({ error: 'Error fetching subject :' + error });
    }
};

// Update a subject by ID
const updateSubject = async (req, res) => {
    try {
        const updatedSubject = await Subject.update(req.body, {
            where: { _id: req.params.id }
        });
        if (updatedSubject[0] === 0) { // Check if any rows were updated
            return res.status(404).json({ error : 'Subject not found' });
        }
        res.status(200).json({ success : 'Subject updated successfully' });
    } catch (error) {
        res.status(400).json({ error: 'Error updating subject :' + error });
    }
};

// Delete a subject by ID
const deleteSubject = async (req, res) => {
    try {
        const deletedSubject = await Subject.destroy({
            where: { _id: req.params.id }
        });
        if (!deletedSubject) {
            return res.status(404).json({ error: 'Subject not found' });
        }
        res.status(200).json({ success: 'Subject deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Error deleting subject :' + error });
    }
};

module.exports = {
    createSubject,
    getAllSubjects,
    getSubjectById,
    updateSubject,
    deleteSubject
};
