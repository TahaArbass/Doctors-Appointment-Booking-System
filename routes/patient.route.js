const express = require('express');

const { PatientValidator} = require('../validators/patientsValidators');

const  { getAllPatients,
          getPatientById,
          getPatientByName,
          createPatient,
          getPatientByPhoneNumber,
          updatePatient,
          deletePatient}  = require('../services/patient.services');

const router = express.Router();

router.get('/', getAllPatients);
router.get('/account/:id', getPatientById);
router.get('/name/:first_name/:last_name', getPatientByName);
router.get('/phone/:phone_number', getPatientByPhoneNumber);

router.post('/', PatientValidator, createPatient)

router.put('/account/:id', PatientValidator, updatePatient);

router.delete('/account/:id', deletePatient);

module.exports = router;