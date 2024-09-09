const { DataTypes } = require('sequelize');
const sequelize = require('../database/connection');

// Import related models
const Subject = require('./subject');
const University = require('./university');

const Faculty = sequelize.define(
    'Faculty', 
    {
        _id:{
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            primaryKey: true,
        },
        _orgId:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        _subId:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        facultyId:{
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        fullName:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        email:{
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        password:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        role:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        experience:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        scholarAccount:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        isActive:{
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
        isDeleted:{
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
    }
);

Faculty.belongsTo(Subject, { foreignKey: '_subId', as: 'subject' });
Faculty.belongsTo(University, { foreignKey: '_orgId', as: 'university' });

module.exports = Faculty;
