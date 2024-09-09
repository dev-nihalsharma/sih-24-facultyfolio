const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const crypto= require('crypto');
const Faculty = require('../models/faculty');
const Admin = require('../models/admin');
const University = require('../models/university');
const dotenv = require('dotenv');
const sendEmail = require('../utils/sendEmail');
const otpModel = require('../models/otp')
const { getJson } = require("serpapi");
dotenv.config();
const extractAuthorIdFromUrl = (url) => {
    const regex = /user=([a-zA-Z0-9-_]+)/;
    const match = url.match(regex);
    return match ? match[1] : null;
};
const userRegister = async (req, res) => {
    const {_orgId, _subId, fullName, email, password, role, scholarAccount, experience, facultyId} = req.body;

    try {
        // Check if the user already exists
        const existingUser = await Faculty.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ error: 'User already exists' });
        }
        const hashedPassword = await bcrypt.hash(password, 8);
        const _id = crypto.randomBytes(8).toString('hex');
        const authorId = extractAuthorIdFromUrl(scholarAccount);
        if (!authorId) {
            return res.status(400).json({ error: 'Invalid Google Scholar URL' });
        }

        // Fetch Google Scholar data using SerpAPI
        getJson({
            engine: "google_scholar_author",
            author_id: authorId,
            api_key: process.env.SERP_API_KEY
        }, async (json) => {
            if (!json || json.error) {
                return res.status(500).json({ error: 'Failed to fetch Google Scholar data' });
            }

            const newUser = await Faculty.create({
                _id,
                _orgId,
                _subId,
                fullName,
                email,
                experience,
                facultyId,
                password: hashedPassword,
                role,
                scholarAccount:json.search_metadata.json_endpoint,
                isActive: false,
                isDeleted: false,
            });


            // Generate a JWT token
            const token = jwt.sign(
                { _id: newUser._id, role: newUser.role, userType: "faculty", _orgId: newUser._orgId },
                process.env.JWT_SECRET,
                { expiresIn: '14d' }
            );

            // Remove password from response
            delete newUser.dataValues.password;

            res.status(201).json({ success: 'Faculty registered successfully', data: { user: newUser, token } });
        });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error: ' + error });
    }
};
const userLogin = async (req, res) => {
    const { email, password } = req.body;
    try {
        let existingUser = await Faculty.findOne({ where: { email,isDeleted:false} });
        let userType = 'faculty';
        if (!existingUser) {
            existingUser = await Admin.findOne({ where: { email,isDeleted:false} });
            userType = 'admin';
        }
        if (!existingUser) {
            return res.status(404).json({ error: 'User not found' });
        }
        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);
        if (!isPasswordCorrect) {
            return res.status(400).json({ error: 'Invalid credentials' });
        }
        const token = jwt.sign(
            { _id: existingUser._id, role: existingUser.role, userType ,_orgId:existingUser._orgId}, 
            process.env.JWT_SECRET, 
            { expiresIn: '14d' }
        );
        delete existingUser.dataValues.password;
        delete existingUser.dataValues.isActive;
        delete existingUser.dataValues.isDeleted;
        res.status(200).json({
            success: `${userType} logged in successfully`,
            data: {user:existingUser, token }
        });

    } catch (error) {
        res.status(500).json({ error: 'Internal server error: ' + error });
    }
};
const forogtPassword = async (req,res)=>{
    const {email} = req.body;
    try{
        const user = await Faculty.findOne({where:{email}});
        if(!user){
            return res.status(404).json({error:'User not found'});
        }
        const otp = Math.floor(100000 + Math.random() * 900000);
        sendEmail(email,'Password Reset OTP - FacultyFolio',`Your OTP is ${otp}`,'');
        await otpModel.create({email,otp});

        res.status(200).json({success:'OTP sent successfully'});
    }
    catch(error){
        res.status(500).json({error:'Internal server error:'+error});
    }
};
const verifyOTP = async (req,res)=>{
    const {email,otp,password} = req.body;
    try{
        const existingOtp = await otpModel.findOne({where:{email,otp,isUsed:false}});
        if(!existingOtp){
            return res.status(400).json({error:'Invalid OTP'});
        }
        await otpModel.update({isUsed:true},{where:{email,otp}});
        const hashedPassword = await bcrypt.hash(password, 8);
        await Faculty.update({password:hashedPassword},{where:{email}});
        res.status(200).json({success:'Password Changed Sucessfully.'});
    }
    catch(error){
        res.status(500).json({error:'Internal server error:'+error});
    }
};

const registerAdmin= async (req,res)=>{
    const {fullName,email,password,role,uniName,uniWebsite,uniLocation} = req.body;
    try{
        const existingAdmin = await Admin.findOne({where:{email}});
        if(existingAdmin){
            return res.status(400).json({error:'Admin already exists'});
        }
        const hashedPassword = await bcrypt.hash(password,8);
        const _id = crypto.randomBytes(8).toString('hex');
        const _orgId = crypto.randomBytes(6).toString('hex');
        const newUser = await Admin.create({
            _id,
            _orgId,
            fullName,
            email,
            password:hashedPassword,
            role,
            isActive:true,
            isDeleted:false,
        });
        const university = await University.create({
            _id:_orgId,
            name:uniName,
            location:uniLocation,
            website:uniWebsite,
        }); 

        const token = jwt.sign({_id:newUser._id,role:newUser.role,userType:"admin",_orgId:newUser._orgId},process.env.JWT_SECRET,{expiresIn:'14d'});
        delete newUser.dataValues.password;
        delete newUser.dataValues.isActive;
        delete newUser.dataValues.isDeleted;
        res.status(201).json({success:'Admin registered successfully',data:{user:newUser,university,token}});
    }
    catch(error){
        res.status(500).json({error:'Internal server error:'+error});
    }  


}
module.exports = { userRegister, userLogin ,registerAdmin,forogtPassword,verifyOTP};