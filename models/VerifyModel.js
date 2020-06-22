const { DataTypes } = require('sequelize')

const MySql = require('../db')

const Verify = MySql.define('verification', {
    email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    },
    code: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
})

module.exports = Verify

// Verify.sync({ force: process.env.NODE_ENV === 'production' ? false : true })