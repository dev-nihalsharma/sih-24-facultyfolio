const studentReview = require('../models/studentReview'); // Import the Review model
const Faculty = require('../models/faculty');
const University = require('../models/university');
const Subject = require('../models/subject');

// Add a new review
const addReview = async (req, res) => {
    try {
        const { name, email, reviewText, rating,_facultyId} = req.body;
        
        if (!_facultyId) {
            return res.status(400).json({ error: 'Faculty ID is required' });
        }
        // Create a new review
        const newReview = await studentReview.create({
            name,
            email,
            reviewText,
            rating,
            _facultyId
        });

        res.status(201).json({ success: 'Review submitted successfully', data: newReview });
    } catch (error) {
        res.status(500).json({ error: 'Error adding review:'+error });
    }
};

const fetchReviews = async (req, res) => {
    try {
        const { _facultyId } = req.params; // Assume the faculty ID is passed as a URL parameter

        if (!_facultyId) {
            return res.status(400).json({ error: 'Faculty ID is required' });
        }

        // Fetch all reviews for the specified faculty member
        const studentReviews = await studentReview.findAll({
            where: { _facultyId },
            order: [['createdAt', 'DESC']] // Order by most recent
        });

        res.status(200).json(studentReviews);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching reviews' });
    }
};
const fetchFaculty = async(req,res)=>{
    try{
        const { _orgId } = req.body;
        const facultyList = await Faculty.findAll({where:{_orgId}});
        if(!facultyList){
            return res.status(404).json({error:'Faculty not found'});
        }
            const facultyList2 = facultyList.map((faculty)=>{
                delete faculty.dataValues.password;
                delete faculty.dataValues.isActive;
                delete faculty.dataValues.isDeleted;
                delete faculty.dataValues._orgId;
                delete faculty.dataValues._subId;
                delete faculty.dataValues.email;
                delete faculty.dataValues.role;
                delete faculty.dataValues.experience;
                delete faculty.dataValues.scholarAccount;
        });
        res.status(200).json(facultyList);
    }
    catch(error){
        res.status(500).json({error:'Error fetching faculty:'+error});
    }
}
const fetchOrg = async(req,res)=>{
    try{
        const university = await University.findAll();
        if(!university){
            return res.status(404).json({error:'University not found'});
        }
        res.status(200).json(university);
    }
    catch(error){
        res.status(500).json({error:'Error fetching university:'+error});
    }
}
const fetchSubject = async(req,res)=>{
    try{
        const subject = await Subject.findAll();
        if(!subject){
            return res.status(404).json({error:'Subject not found'});
        }
        res.status(200).json(subject);

    }
    catch(error){
        res.status(500).json({error:'Error fetching subject:'+error});
    }
}
module.exports = {
    addReview,
    fetchReviews,
    fetchFaculty,
    fetchOrg,
    fetchSubject
}