const express = require('express');
const { PatientValidator} = require('../validators/patientsValidators');
const  { getAllPatients, getPatientById, createPatient }  = require('../services/patient.services');
const router = express.Router();

router.get('/', getAllPatients);
router.get('/:id', getPatientById);
router.post('/', PatientValidator, createPatient)

module.exports = router;