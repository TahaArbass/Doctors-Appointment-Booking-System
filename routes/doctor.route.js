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
    deleteDoctor,
    signUpDoctor,
    loginDoctor } = require('../services/doctor.services');

const router = express.Router();

// getters for patients
router.get('/', getAllDoctors);
router.get('/account/:id', getDoctorById);
router.get('/name/:first_name/:last_name', getDoctorByName);
router.get('/phone/:phone_number', getDoctorByPhoneNumber);
router.get('/email/:email', getDoctorByEmail);

// sign up
router.post('/signup', signUpDoctor);
router.get('/signup', (req, res) => {
    res.render('signupDoctor');
}); // rendering view

// login
router.post('/login', loginDoctor);
router.get('/login', (req, res) => {
    res.render('loginDoctor');
}); // rendering view

// create, update, delete doctor
router.post('/create', DoctorValidator, createDoctor);
router.get('/create', (req, res) =>{
    res.render('createDoctor');
});

router.put('/account/:id', DoctorValidator, updateDoctor);
router.post('/updateDoctor', DoctorValidator, updateDoctor);
router.get('/updateDoctor/:id', (req, res) => {
    res.render('updateDoctor', {id: req.params.id});
});
router.delete('/account/:id', deleteDoctor);
router.get('/deleteDoctor/:id', deleteDoctor);

// export router
module.exports = router;