const express = require('express');

//const { SpecialtyValidator } = require('../validators/specialtyValidators');

// specialty services
const { getAllSpecialties,
     getSpecialtyById,
     getSpecialtyByName,
     createSpecialty,
     updateSpecialty } = require('../services/specialty.services');

// specialty router
const router = express.Router();

// getters for specialties
router.get('/', getAllSpecialties);
router.get('/id/:id', getSpecialtyById);
router.get('/name/:name', getSpecialtyByName);

// create , update, delete specialty
router.post('/', createSpecialty);
router.put('/id/:id', updateSpecialty);

// create, update, delete specialty
module.exports = router;