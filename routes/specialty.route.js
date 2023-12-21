const express = require('express');

// specialty validator
const { SpecialtyValidator } = require('../validators/specialtyValidators');

// specialty services
const { getAllSpecialties,
     getSpecialtyById,
     getSpecialtyByName,
     createSpecialty,
     updateSpecialty, 
     deleteSpecialty} = require('../services/specialty.services');

// specialty router
const router = express.Router();

// getters for specialties
router.get('/', getAllSpecialties);
router.get('/id/:id', getSpecialtyById);
router.get('/name/:name', getSpecialtyByName);

// create , update, delete specialty
router.post('/create/', SpecialtyValidator ,createSpecialty);

router.put('/id/:id', SpecialtyValidator ,updateSpecialty);

router.delete('/id/:id', deleteSpecialty);
router.get('/deleteSpecialty/:id', deleteSpecialty);
// create, update, delete specialty
module.exports = router;