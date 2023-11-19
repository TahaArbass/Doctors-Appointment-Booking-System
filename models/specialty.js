const { DataTypes } = require('sequelize');
const db = require("../db/configSqlz");

const Specialty = db.define('Specialty', {

    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    
    name:{
        type: DataTypes.STRING(255),
        allowNull: false,
    },
}, {
    timestamps: false
});

module.exports = Specialty;