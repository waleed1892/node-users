const { Sequelize } = require('sequelize')
require('dotenv').config()

const sequelize = new Sequelize({
    dialect: process.env.DATABASE_DRIVER,
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD
})

module.exports = sequelize