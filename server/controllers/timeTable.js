const TimeTable = require('../models/timeTable');
const Subject = require('../models/subject');
const Faculty = require('../models/faculty');
const crypto = require('crypto');

const fetchTimeTable = async (req, res) => {
    const _orgId = req.body._orgId;
    try {
        const timeTable = await TimeTable.findAll({
            where: { _orgId },
            include: [
                {
                    model: Subject,
                    attributes: ['name'], // Fetch subjectName
                    as: 'subject',
                },
                {
                    model: Faculty,
                    attributes: ['fullName'], // Fetch facultyName
                    as: 'faculty',
                },
            ]
        });    
        if (!timeTable || timeTable.length === 0) {
            return res.status(404).json({ error: 'Time table not found' });
        }
    
        res.status(200).json(timeTable);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching time table: ' + error });
    }
}
const createTimeTable = async (req, res) => {
    const {_orgId,_subId,_facultyId,day,startTime,endTime,room} = req.body;
    const _id = crypto.randomBytes(8).toString('hex');
    try{
        const newTimeTable = await TimeTable.create({
            _id,
            _orgId,
            _subId,
            _facultyId,
            day,
            startTime,
            endTime,
            room
        });
        res.status(201).json({success:"Timetable created successfully"});
    }
    catch(error){
        res.status(400).json({error:'Error creating time table :'+error});
    }
}
const updateTimeTable = async (req, res) => {
    const _id = req.params.id;
    try{
        const updatedTimeTable = await TimeTable.update(req.body,{where:{_id}});
        if(updatedTimeTable[0] === 0){
            return res.status(404).json({error:'Time table not found'});
        }
        res.status(200).json({success:'Time table updated successfully'});
    }
    catch(error){
        res.status(400).json({error:'Error updating time table :'+error});
    }
}
const deleteTimeTable = async (req, res) => {
    const _id=req.params.id;
    try{
        const deletedTimeTable = await TimeTable.destroy({where:{_id}});
        if(!deletedTimeTable){
            return res.status(404).json({error:'Time table not found'});
        }
        res.status(200).json({success:'Time table deleted successfully'});
    }
    catch{
        res.status(500).json({error:'Error deleting time table :'+error});
    }
}
const getTimeTableById = async(req,res)=>{
    const _id = req.params.id;
    try{
        const timeTable = await TimeTable.findOne({where:{_id}});
        if(!timeTable){
            return res.status(404).json({error:'Time table not found'});
        }
        res.status(200).json(timeTable);
    }
    catch(error){
        res.status(500).json({error:'Error fetching time table :'+error});
    }
}
const fetchDailyTimeTable= async(req,res)=>{
    const {_facultyId,day} = req.body;
    try{
        const timeTable = await TimeTable.findAll({
            where:{_facultyId,day},
            include:[
                {
                    model:Subject,
                    attributes:['name'],
                    as:'subject'
                },
                {
                    model:Faculty,
                    attributes:['fullName'],
                    as:'faculty'
                }
            ]
        });
        if(!timeTable || timeTable.length === 0){
            return res.status(404).json({error:'Time table not found'});
        }
        res.status(200).json(timeTable);
    }
    catch{
        res.status(500).json({error:'Error fetching time table :'+error});
    }

}
module.exports = {
    fetchTimeTable,
    createTimeTable,
    updateTimeTable,
    deleteTimeTable,
    getTimeTableById,
    fetchDailyTimeTable
}