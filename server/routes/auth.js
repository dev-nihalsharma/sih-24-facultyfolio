const express = require('express');
const router = express.Router();
const { userLogin, userRegister,registerAdmin,forogtPassword,verifyOTP} = require('../controllers/auth');
router.post('/login', userLogin);
router.post('/forgotpassword',forogtPassword);
router.post('/verifyOTP',verifyOTP);
router.post('/register/faculty', userRegister);
router.post('/register/admin',registerAdmin);
module.exports = router;