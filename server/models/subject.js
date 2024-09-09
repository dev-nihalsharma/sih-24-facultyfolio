const {DataTypes} = require('sequelize');
const sequelize = require('../database/connection');
const Subject = sequelize.define(
    'Subject', 
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

        name:{
            type:DataTypes.STRING,
            allowNull:false,
        },
        code:{
            type:DataTypes.STRING,
            allowNull:false,
        },
        description : {
            type: DataTypes.TEXT,
            allowNull: false,
        },

});

module.exports = Subject;