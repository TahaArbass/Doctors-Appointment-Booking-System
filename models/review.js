const { DataTypes } = require('sequelize');
const db = require("../db/configSqlz");
const Doctor = require("./doctor");
const Patient = require("./patient");

const Review = db.define("Review", {

    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },

    doctor_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },

    patient_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },

    rating: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },

    comment: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
}, {
    timestamps: false,
});

// establish foreign keys
Review.belongsTo(Doctor, { foreignKey: "doctor_id" });
Review.belongsTo(Patient, { foreignKey: "patient_id" });

module.exports = Review;