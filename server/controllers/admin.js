
const Admin = require('../models/admin');
const Faculty = require('../models/faculty');
const dotenv = require('dotenv');
dotenv.config();
// Read the single admin
const getAdmin = async (req, res) => {
    try {
        const admin = await Admin.findOne({where:{isActive:true,isDeleted:false}}); // Fetch the single admin
        if (!admin) {
            return res.status(404).json({ success: 'Admin not found' });
        }
        delete admin.dataValues.password;
        delete admin.dataValues.isDeleted;
        delete admin.dataValues.isActive;
        res.status(200).json(admin);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching admin : '+error});
    }
};

// Update the single admin
const updateAdmin = async (req, res) => {
    try {
        const admin = await Admin.findOne();
        if (!admin) {
            return res.status(404).json({ error : 'Admin not found' });
        }

        await admin.update(req.body);
        res.status(200).json({ success: 'Admin updated successfully' });
    } catch (error) {
        res.status(400).json({ error: 'Error updating admin : '+ error });
    }
};

// Admin approves or rejects a faculty request
const activatefaculty = async (req, res) => {
    try {
        const { facultyId } = req.params; // Faculty ID from the request params
        
        // Find the faculty by ID
        const faculty = await Faculty.findByPk(facultyId);
        if (!faculty) {
            return res.status(404).json({ error: 'Faculty not found' });
        }

        // Update the faculty active status
        faculty.isActive=true;
        await faculty.save();

        res.status(200).json({ success: 'Faculty account activated successfully' });
    } catch (error) {
        res.status(400).json({ error: 'Error activating faculty :' +  error });
    }
};

// Admin deactivates the faculty account by setting isActive to false
const deactivateFaculty = async (req, res) => {
    try {
        const { facultyId } = req.params; // Faculty ID from the request params

        // Find the faculty by ID
        const faculty = await Faculty.findByPk(facultyId);
        if (!faculty) {
            return res.status(404).json({ error: 'Faculty not found' });
        }

        // Update isActive to false
        faculty.isActive = false;
        await faculty.save();

        res.status(200).json({ success: 'Faculty account deactivated successfully' });
    } catch (error) {
        res.status(400).json({ error: 'Error deactivating faculty :' + error  });
    }
};


module.exports={
    getAdmin,
    updateAdmin,
    activatefaculty,
    deactivateFaculty
}
