const express = require("express");

const router = express.Router();

const {
    getAllAppointments,
    getAppointmentById,
    getAppointmentByDoctorId,
    getAppointmentByPatientId,
    getAppointmentByDate,
    getAppointmentByStatus,
    createAppointment,
    updateAppointment,
    deleteAppointment
    } = require("../services/appointment.services");

const {AppointmentValidator} = require("../validators/AppointmentValidator");

// getters for appointment
router.get("/", getAllAppointments);

router.get("/id/:id", getAppointmentById);

router.get("/doctor/:doctor_id", getAppointmentByDoctorId);

router.get("/patient/:patient_id", getAppointmentByPatientId);

router.get("/status/:status", getAppointmentByStatus);

router.get("/date/:appointment_datetime", getAppointmentByDate);

// create, update and delete

router.post("/create", AppointmentValidator, createAppointment);

router.put("id/:id", AppointmentValidator, updateAppointment);

router.delete("id/:id", deleteAppointment);

module.exports = router;