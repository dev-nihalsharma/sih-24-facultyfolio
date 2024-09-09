const crypto = require('crypto');
const Event = require('../models/event');

const addEvent = async(req,res)=>{
    const _id = crypto.randomBytes(8).toString('hex');
    const {name,type,category,description,date,time,venue,assignedfaculty,_orgId} = req.body;
    try{
        const newEvent = await Event.create({
            _orgId,
            _id,
            name,
            type,
            category,
            description,
            date,
            time,
            venue,
            assignedfaculty
        });
        res.status(201).json({success:'Event created successfully'});
    }
    catch(error){
        res.status(400).json({error:'Error creating event :'+error});
    }
}

const fetchEvents = async(req,res)=>{
    const {_orgId} = req.body;
    try{
        const events = await Event.findAll({where:{_orgId}});
        res.status(200).json(events);
    }
    catch(error){
        res.status(500).json({error:'Error fetching events :'+error});
    }
}

const updateEvents = async(req,res)=>{
    const {_eventId} = req.params.id;
    try{
        const updatedEvent = await Event.update(req.body,{where:{_eventId}});
        if(updatedEvent[0] === 0){
            return res.status(404).json({error:'Event not found'});
        }
        res.status(200).json({success:'Event updated successfully'});
    }
    catch(error){
        res.status(400).json({error:'Error updating event :'+error});
    }

}
const deleteEvents = async(req,res)=>{
    const {_eventId} = req.params.id;
    try{
        const deletedEvent = await Event.destroy({where:{_eventId}});
        if(deletedEvent === 0){
            return res.status(404).json({error:'Event not found'});
        }
        res.status(200).json({success:'Event deleted successfully'});
    }
    catch(error){
        res.status(400).json({error:'Error deleting event :'+error});
    }
}

module.exports = {addEvent,fetchEvents,updateEvents,deleteEvents};