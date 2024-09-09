const {DataTypes} = require('sequelize');
const sequelize = require('../database/connection');
const Admin = sequelize.define(
    'Admin', 
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
        fullName:{
            type:DataTypes.STRING,
            allowNull:false,
        },
        email:{
            type:DataTypes.STRING,
            allowNull:false,
            unique:true,
        },
        password:{
            type:DataTypes.STRING,
            allowNull:false,
        },
        role:{
            type:DataTypes.STRING,
            allowNull:false,
        },
        isActive:{
            type:DataTypes.BOOLEAN,
            allowNull:false,
        },
        isDeleted:{
            type:DataTypes.BOOLEAN,
            allowNull:false,
        },
});

module.exports = Admin;