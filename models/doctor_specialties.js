const { DataTypes } = require('sequelize');
const db = require("../db/configSqlz");
const Doctor = require("./doctor");
const Specialty = require("./specialty");

const DoctorSpecialties = db.define("DoctorSpecialties", {

    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },

    doctor_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },

    specialty_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
}, {
    timestamps: false,
});

// establishing foreign keys
DoctorSpecialties.belongsTo(Doctor, {foreignKey:"doctor_id"});
DoctorSpecialties.belongsTo(Specialty, {foreignKey:"specialty_id"});

module.exports = DoctorSpecialties;