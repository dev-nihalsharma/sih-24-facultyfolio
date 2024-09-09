const {DataTypes} = require('sequelize');
const sequelize = require('../database/connection');
const Subject = require('./subject');
const Faculty = require('./faculty');
const TimeTable = sequelize.define(
    'TimeTable', 
    {
        _id:{
            type:DataTypes.STRING,
            allowNull:false,
            unique:true,
            primaryKey:true,
        },
        _orgId:{
            type:DataTypes.STRING,
            allowNull:false,
        },
        _subId:{
            type:DataTypes.STRING,
            allowNull:false,
        },
        _facultyId:{
            type:DataTypes.STRING,
            allowNull:false,
        },
        day:{
            type:DataTypes.STRING,
            allowNull:false,
        },
        startTime:{
            type:DataTypes.TIME,
            allowNull:false,
        },
        endTime:{
            type:DataTypes.TIME,
            allowNull:false,

        },
        room:{
            type:DataTypes.STRING,
            allowNull:false,
        },
});
TimeTable.belongsTo(Subject, { foreignKey: '_subId', as: 'subject' });
TimeTable.belongsTo(Faculty, { foreignKey: '_facultyId', as: 'faculty' });
module.exports = TimeTable;