const { DataTypes } = require('sequelize');
const sequelize = require('../database/connection');
const TimeTable = require('./timeTable'); // Assuming you have these models
const Event = require('./event');
const Faculty = require('./faculty');

const Attendance = sequelize.define('Attendance', {
  _id: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4,
  },
  _orgId: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  _timeTableId: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  _eventId: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  _facultyId: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
    },
  isPresent:{
    type:DataTypes.BOOLEAN,
    allowNull:false,
  },
});

Attendance.belongsTo(TimeTable, { foreignKey: '_timeTableId', as: 'timeTable' });
Attendance.belongsTo(Event, { foreignKey: '_eventId', as: 'event' });
Attendance.belongsTo(Faculty, { foreignKey: '_facultyId', as: 'faculty' });
module.exports = Attendance;
