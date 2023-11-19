const { DataTypes } = require('sequelize');
const db = require("../db/configSqlz");
const Doctor = require("./doctor");
const Patient = require("./patient");


const Appointment = db.define("Appointment", {

    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },

    doctor_id:{
        type:DataTypes.INTEGER,
        allowNull: false,
    },

    patient_id:{
        type:DataTypes.INTEGER,
        allowNull: false,
    },

    appointment_datetime:{
        type:DataTypes.DATE,
        allowNull:false,
    },

    status:{
        type:DataTypes.ENUM,
        values:['pending','scheduled','canceled','completed'],
        defaultValue:'pending',
    },

    reason:{
        type:DataTypes.TEXT,
        allowNull:true,
    },
} , {
    timestamps: false,
});

// establish foreign keys
Appointment.belongsTo(Doctor,{foreignKey: "doctor_id"});
Appointment.belongsTo(Patient,{foreignKey: "patient_id"});

module.exports = Appointment;