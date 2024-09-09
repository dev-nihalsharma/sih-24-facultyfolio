const {DataTypes} = require('sequelize');
const sequelize = require('../database/connection');
const Event = sequelize.define(
    'Event', 
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
       
        name: { 
            type: DataTypes.STRING, 
            allowNull: false, 
         },

        type: {
            type: DataTypes.STRING, 
            allowNull: false, 
         },
        
        category:{
            type: DataTypes.STRING, 
            allowNull: true, 
         },

        description: {
            type: DataTypes.TEXT,
            allowNull: false, 
         },
        
        date: {
         type: DataTypes.DATEONLY,
          allowNull:false,
        },

        time: {
         type: DataTypes.TIME, 
         allowNull: false, 
        },

        venue: {
            type: DataTypes.STRING, 
            allowNull: true, 
         },

        assignedfaculty: {
            type: DataTypes.STRING, 
            allowNull: false, 
         },
        
       
});
module.exports = Event;