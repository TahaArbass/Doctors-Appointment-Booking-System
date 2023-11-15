const express = require('express');

// getting patient validator
const { PatientValidator} = require('../validators/patientsValidators');

// getting patient services
const  { getAllPatients,
          getPatientById,
          getPatientByName,
          createPatient,
          getPatientByPhoneNumber,
          updatePatient,
          deletePatient}  = require('../services/patient.services');

const router = express.Router();

// getters for patients
router.get('/', getAllPatients);
router.get('/account/:id', getPatientById);
router.get('/name/:first_name/:last_name', getPatientByName);
router.get('/phone/:phone_number', getPatientByPhoneNumber);

// create, update, delete patient
router.post('/', PatientValidator, createPatient)

router.put('/account/:id', PatientValidator, updatePatient);

router.delete('/account/:id', deletePatient);

// export router
module.exports = router;