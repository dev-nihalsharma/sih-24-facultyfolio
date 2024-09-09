const { Sequelize } = require('sequelize');
const dotenv = require('dotenv');
dotenv.config();
const sequelize = new Sequelize(process.env.DB_NAME,process.env.DB_HOST_USERNAME ,process.env.DB_HOST_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: 'mysql',
});
sequelize
    .authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch((error) => {
        console.error('Unable to connect to the database:', error);
    });
module.exports = sequelize;