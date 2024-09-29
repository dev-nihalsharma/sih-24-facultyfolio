const express = require('express');
const app = express();
const dotenv = require('dotenv');
const cors = require('cors');
const jwtVerify = require('./middleware/jwt');
const authRoutes = require('./routes/auth');
const sequelize = require('./database/connection');
const adminRoutes = require('./routes/admin');
const facultyRoutes = require('./routes/faculty');
const subjectRoutes = require('./routes/subject');
const timeTableRoutes = require('./routes/timeTable');
const attendanceRoutes = require('./routes/attendance');
const eventRoutes = require('./routes/event');
const studentReviewRoutes = require('./routes/studentReview');

app.use(cors());
dotenv.config();
sequelize.sync();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/auth', authRoutes);
app.use('/reviews', studentReviewRoutes);
app.use(jwtVerify);
app.use('/subject', subjectRoutes);
app.use('/users', adminRoutes);
app.use('/users', facultyRoutes);
app.use('/timetable', timeTableRoutes);
app.use('/attendance', attendanceRoutes);
app.use('/event', eventRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on ${process.env.PORT}`);
});
