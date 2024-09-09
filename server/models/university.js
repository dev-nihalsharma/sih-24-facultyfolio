const {DataTypes} = require('sequelize');
const sequelize = require('../database/connection');
const University = sequelize.define('University', {
    _id:{
        type:DataTypes.STRING,
        allowNull:false,
        unique:true,
        primaryKey:true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    location: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    website: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    })
module.exports = University;