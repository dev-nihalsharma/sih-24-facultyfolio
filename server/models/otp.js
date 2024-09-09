const { DataTypes } = require('sequelize');
const sequelize = require('../database/connection');

const Otp=sequelize.define(
     'Otp',{
        _id:{
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4,
        },
        otp:{
            type:DataTypes.STRING,
            allowNull:false,
        },
        email:{
            type:DataTypes.STRING,
            allowNull:false,
            unique:true,
            validate: {
                isEmail: true,
            }
        },
        isUsed:{
            type:DataTypes.BOOLEAN,
            allowNull:false,
            defaultValue:false,
        },
     }
)

module.exports=Otp;