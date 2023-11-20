const express = require('express');

// getting patient validator
const { PatientValidator } = require('../validators/patientsValidators');

// getting patient services
const { getAllPatients,
    getPatientById,
    getPatientByName,
    createPatient,
    getPatientByPhoneNumber,
    getPatientByEmail,
    updatePatient,
    deletePatient,
    signupPatient,
    loginPatient } = require('../services/patient.services');


const authMiddleware  = require('../utils/authMiddleware');

const router = express.Router();

// getters for patients
router.get('/', getAllPatients);
router.get('/id/:id', getPatientById);
router.get('/name/:first_name/:last_name', getPatientByName);
router.get('/phone/:phone_number', getPatientByPhoneNumber);
router.get('/email/:email', getPatientByEmail);


// create, update, delete patient
router.post('/', PatientValidator, createPatient);

router.post('/signup', PatientValidator, signupPatient);

router.post('/login', loginPatient);

router.put('/account/:id', authMiddleware, PatientValidator, updatePatient);

router.delete('/account/:id', deletePatient);

// export router
module.exports = router;