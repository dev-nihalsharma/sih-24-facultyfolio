const {DataTypes} = require('sequelize');
const sequelize = require('../database/connection');

const studentReview = sequelize.define(
    'studentReview', 
    {
    _id: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isEmail: true,
        }
    },
    reviewText: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    rating: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            min: 1,
            max: 10,
        }
    },
    _facultyId: {
        type: DataTypes.STRING,
        allowNull: false,
    },
});

module.exports = studentReview;