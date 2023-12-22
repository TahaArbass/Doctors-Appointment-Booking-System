const Doctor = require("../models/doctor");
const Address = require("../models/address");
const Specialty = require("../models/specialty");
const DoctorSpecialty = require("../models/doctor_specialties");
const Appointment = require("../models/appointment");
const Patient = require("../models/patient");
const { generateToken } = require("../utils/auth");
const bcrypt = require('bcrypt');
// create a doctor
const createDoctor = async (req, res) => {
  const { first_name, last_name, email, phone_number, date_of_birth, password, clinic_address_id } = req.body;

  try {

    // check if the address exists
    const existingAddress = await Address.findByPk(clinic_address_id);

    if (!existingAddress) {
      return res.status(400).json({ error: 'Address not found' });
    }

    // then create the doctor
    const createdDoctor = await Doctor.create({
      first_name,
      last_name,
      email,
      phone_number,
      date_of_birth,
      password,
      clinic_address_id,
    });
    // res.status(201).json(createdDoctor);
    res.redirect('/api/doctors');
  } catch (error) {
    console.error(error);
  }
};

const getAllDoctors = async (req, res) => {
  try {
    const doctors = await Doctor.findAll();
    res.render('detailDoctors', {doctors: doctors});
    // res.json(doctors);
  } catch (error) {
    console.error(error);
  }
};

// search for doctor by his ID
const getDoctorById = async (req, res) => {
  const id = req.params.id;
  try {
    const doctor = await Doctor.findByPk(id);
    if (doctor) {
      res.status(200).json(doctor);
    }
    else {
      return res.status(404).json({ message: 'doctor not found' });
    }
  } catch (error) {
    console.error(error);
  }
};

// search for doctor by his full name
const getDoctorByName = async (req, res) => {
  const first_name = req.params.first_name;
  const last_name = req.params.last_name;
  try {
    const doctor = await Doctor.findAll({where: {first_name: first_name, last_name: last_name}});
    if (doctor) {
      res.status(200).json(doctor);
    }
    else {
      return res.status(404).json({ message: 'Doctor not found' });
    }
  } catch (error) {
    console.error(error);
  }
};

// search for doctor by phone number
const getDoctorByPhoneNumber = async (req, res) => {
  const phone_number = req.params.phone_number;
  try {
    const doctor = await Doctor.findAll({where: {phone_number: phone_number}});
    if (doctor) {
      res.status(200).json(doctor);
    }
    else {
      return res.status(404).json({ message: 'doctor not found' });
    }
  } catch (error) {
    console.error(error);
  }
};

// search for doctor by email
const getDoctorByEmail = async (req, res) => {
  const email = req.params.email;
  try {
    const doctor = await Doctor.findOne({where: {email: email}});
    if (doctor) {
      res.status(200).json(doctor);
    }
    else {
      return res.status(404).json({ message: 'Patient not found' });
    }
  } catch (error) {
    console.error(error);
  }
};

const updateDoctor = async (req, res) => {
  try {

    // search for doctor then update
    const updatedDoctor = await Doctor.update(
      {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        phone_number: req.body.phone_number,
        date_of_birth: req.body.date_of_birth,
        password: req.body.password,
      },
      { where: { id: req.body.id } }
    );

    if(!updatedDoctor) {
      return res.status(404).json({ error: 'Doctor not found' });
    }

    res.redirect('/api/doctors');
    // res.status(200).json({
    //   message: 'Doctor updated successfully',
    //   updatedDoctor: updatedDoctor.toJSON,
    // });

  } catch (error) {
    console.error(error);
  }
};

// doctor sign up
const signUpDoctor = async (req, res) => {
  const { first_name, last_name, email, phone_number, date_of_birth, password, clinic_address_id, specialty} = req.body;
  // console.log(req.body);
  try {
    // Check if the address exists
    const existingAddress = await Address.findByPk(clinic_address_id);
    if (!existingAddress) {
      return res.status(400).json({ error: 'Address not found' });
    }

    // Associate the doctor with specialties
    if (!specialty) {
      return res.status(400).json({ error: 'Specialty not found' });
    }

    // Create the doctor
    const createdDoctor = await Doctor.create({
      first_name,
      last_name,
      email,
      phone_number,
      date_of_birth,
      password,
      clinic_address_id,
    });

    // create the specialty
    const selectedSpecialties = await Specialty.findOne({ where: { name: specialty } });
    if(!selectedSpecialties) {
      selectedSpecialties = await Specialty.create({ name: specialty });
    }

    // create the doctor_specialty
    await DoctorSpecialty.create({doctor_id: createdDoctor.id, specialty_id: selectedSpecialties.id});

    // res.status(201).json(createdDoctor);
    const appointments = await Appointment.findAll({where: {doctor_id: createdDoctor.id}});
    const patients = await Patient.findAll({where: {id: appointments.map(appointment => appointment.patient_id)}});
    res.render('appointmentsForDr', {appointments: appointments, patients: patients, doctor: createdDoctor});
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// login doctor
const loginDoctor = async (req, res) => {
  const { email, password } = req.body;

  try {
    const doctor = await Doctor.findOne({ where: { email } });

    // login for admin, ofc it should be hidden but I am testing it
    if(email === 'admin123@gmail.com' && password === 'Admin69420') {
      res.redirect('/api/patients/');
      return;
    }

    if (!doctor) {
      return res.status(404).json({ error: 'Doctor not found' });
    }

    const passwordValid = await bcrypt.compare(password, doctor.password);

    if (!passwordValid) {
      return res.status(401).json({ error: 'Incorrect password' });
    }

    const appointments = await Appointment.findAll({where: {doctor_id: doctor.id}});
    const patients = await Patient.findAll({where: {id: appointments.map(appointment => appointment.patient_id)}});
    const token = generateToken(doctor.id);

    res.render('appointmentsForDr', {doctor: doctor, appointments: appointments, 
      token: token, patients : patients});
    // res.status(200).json({
    //   message: 'Patient logged in successfully',
    //   token,
    // });
  }
  catch (error) {
    console.error(error);
  }
}

// delete a doctor
const deleteDoctor = async (req, res) => {
  try {
    const id = req.params.id;

    // find the doctor
    const doctor = await Doctor.findByPk(id);

    if (!doctor) {
      return res.status(404).json({ error: 'doctor not found' });
    }

    // delete it
    const deletedDoctor = await doctor.destroy();
    
    res.status(200).json({
      message: 'doctor deleted successfully',
      deletedDoctor: deletedDoctor.toJSON(),
    });

  } catch (error) {
    console.error(error);
  }
};

module.exports = {
  getAllDoctors,
  getDoctorById,
  getDoctorByName,
  getDoctorByPhoneNumber,
  getDoctorByEmail,
  createDoctor,
  updateDoctor,
  deleteDoctor,
  signUpDoctor,
  loginDoctor,
};
