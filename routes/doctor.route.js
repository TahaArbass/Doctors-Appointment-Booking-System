const express = require('express');

// getting patient validator
const { DoctorValidator } = require('../validators/doctorValidators');

// getting patient services
const { getAllDoctors,
    getDoctorById,
    getDoctorByName,
    getDoctorByPhoneNumber,
    getDoctorByEmail,
    createDoctor,
    updateDoctor,
    deleteDoctor } = require('../services/doctor.services');

const router = express.Router();

// getters for patients
router.get('/', getAllDoctors);
router.get('/account/:id', getDoctorById);
router.get('/name/:first_name/:last_name', getDoctorByName);
router.get('/phone/:phone_number', getDoctorByPhoneNumber);
router.get('/email/:email', getDoctorByEmail);

// create, update, delete patient
router.post('/', DoctorValidator, createDoctor)

router.put('/account/:id', DoctorValidator, updateDoctor);

router.delete('/account/:id', deleteDoctor);

// export router
module.exports = router;